import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
  FaCheck, FaTimes, FaEye, FaTrash,
  FaUsers, FaVideo, FaClock, FaCheckCircle,
  FaSearch, FaArrowLeft, FaSync, FaPlus,
  FaEdit, FaSave, FaTimesCircle, FaChartLine
} from 'react-icons/fa';
import { Spinner, Form } from 'react-bootstrap';

const AdminPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [pendingVideos, setPendingVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    users: 0,
    visits: 0
  });

  const [newShortLink, setNewShortLink] = useState('');
  const [newShortType, setNewShortType] = useState('shorts');
  const [newShortDescription, setNewShortDescription] = useState('');
  const [addingShort, setAddingShort] = useState(false);
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!adminLoggedIn) {
      navigate('/admin-login');
      return;
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const { data: allVideos, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (videosError) throw videosError;

      const userIds = [...new Set(allVideos?.map(v => v.user_id).filter(id => id) || [])];
      let usersMap = {};

      if (userIds.length > 0) {
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('id, username')
          .in('id', userIds);

        if (!usersError && users) {
          usersMap = users.reduce((acc, u) => {
            acc[u.id] = u;
            return acc;
          }, {});
        }
      }

      const mergedVideos = (allVideos || []).map(video => ({
        ...video,
        users: usersMap[video.user_id] || { username: 'Unknown' }
      }));

      const pending = mergedVideos.filter(v => v.status === 'pending');
      const approved = mergedVideos.filter(v => v.status === 'approved');
      const rejected = mergedVideos.filter(v => v.status === 'rejected');

      let visitsCount = 0;
      try {
        const { data: visitData, error: visitError } = await supabase
          .from('site_stats')
          .select('visit_count')
          .eq('id', 1)
          .single();

        if (!visitError && visitData) {
          visitsCount = visitData.visit_count || 0;
        }
      } catch (error) {
        visitsCount = parseInt(localStorage.getItem('localVisitCount')) || 0;
      }

      setStats({
        total: mergedVideos.length,
        pending: pending.length,
        approved: approved.length,
        rejected: rejected.length,
        users: userIds.length,
        visits: visitsCount
      });

      setVideos(mergedVideos);
      setPendingVideos(pending);
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddShort = async (e) => {
    e.preventDefault();
    const videoId = extractYoutubeId(newShortLink);
    if (!videoId) {
      alert('Invalid YouTube URL');
      return;
    }

    setAddingShort(true);
    try {
      const { error } = await supabase
        .from('videos')
        .insert({
          user_id: 'your-admin-user-id-here',
          youtube_video_id: videoId,
          status: 'approved',
          type: newShortType,
          description: newShortDescription || (newShortType === 'shorts' ? '📱 Shorts' : '🎬 Video')
        });

      if (error) throw error;

      setNewShortLink('');
      setNewShortDescription('');
      setNewShortType('shorts');
      setShowAddModal(false);
      await fetchAllData();
      alert('✅ Content added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      setAddingShort(false);
    }
  };

  const approveVideo = async (videoId) => {
    setProcessing(prev => ({ ...prev, [videoId]: 'approving' }));
    try {
      const { error } = await supabase
        .from('videos')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          admin_notes: 'Approved'
        })
        .eq('id', videoId);

      if (error) throw error;
      await fetchAllData();
      alert('✅ Video approved!');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error approving');
    } finally {
      setProcessing(prev => ({ ...prev, [videoId]: undefined }));
    }
  };

  const rejectVideo = async (videoId) => {
    const reason = prompt('Reason for rejection (optional):');
    setProcessing(prev => ({ ...prev, [videoId]: 'rejecting' }));
    try {
      const { error } = await supabase
        .from('videos')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          admin_notes: reason || 'Rejected'
        })
        .eq('id', videoId);

      if (error) throw error;
      await fetchAllData();
      alert('❌ Video rejected');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error rejecting');
    } finally {
      setProcessing(prev => ({ ...prev, [videoId]: undefined }));
    }
  };

  const deleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video permanently?')) return;
    setProcessing(prev => ({ ...prev, [videoId]: 'deleting' }));
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoId);

      if (error) throw error;
      await fetchAllData();
      alert('🗑️ Video deleted');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error deleting');
    } finally {
      setProcessing(prev => ({ ...prev, [videoId]: undefined }));
    }
  };

  const startEditDescription = (video) => {
    setEditingVideo(video.id);
    setEditDescription(video.description || '');
  };

  const saveDescription = async (videoId) => {
    setProcessing(prev => ({ ...prev, [videoId]: 'saving' }));
    try {
      const { error } = await supabase
        .from('videos')
        .update({ description: editDescription })
        .eq('id', videoId);

      if (error) throw error;
      await fetchAllData();
      setEditingVideo(null);
      alert('✅ Description updated');
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error updating description');
    } finally {
      setProcessing(prev => ({ ...prev, [videoId]: undefined }));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-warning text-dark',
      approved: 'bg-success',
      rejected: 'bg-danger'
    };
    const labels = {
      pending: '⏳ Pending',
      approved: '✅ Approved',
      rejected: '❌ Rejected'
    };
    return <span className={`badge ${styles[status] || 'bg-secondary'}`}>{labels[status] || status}</span>;
  };

  const getTypeBadge = (type) => {
    return type === 'shorts'
      ? <span className="badge bg-info">📱 Shorts</span>
      : <span className="badge bg-secondary">🎬 Video</span>;
  };

  const getFilteredVideos = () => {
    let filtered = videos;
    if (filterStatus !== 'all') {
      filtered = filtered.filter(v => v.status === filterStatus);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(v =>
        v.youtube_video_id?.toLowerCase().includes(term) ||
        v.description?.toLowerCase().includes(term) ||
        v.users?.username?.toLowerCase().includes(term)
      );
    }
    return filtered;
  };

  const displayVideos = activeTab === 'pending' ? pendingVideos : getFilteredVideos();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin-login');
  };

  return (
    <div

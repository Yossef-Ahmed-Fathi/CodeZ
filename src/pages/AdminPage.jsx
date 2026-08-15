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
    <div className="admin-page">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back
          </button>
          <h4 className="mb-0">⚙️ Admin Panel</h4>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
          <button className="btn btn-success btn-sm" onClick={() => setShowAddModal(true)}>
            <FaPlus /> Add Shorts
          </button>
          <button className="btn btn-outline-primary btn-sm" onClick={fetchAllData}>
            <FaSync /> Refresh
          </button>
        </div>
      </div>

      <div className="row g-2 g-md-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="stat-card"><FaChartLine className="text-primary" /><h3>{stats.visits}</h3><p>Total Visits</p></div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card"><FaVideo className="text-success" /><h3>{stats.total}</h3><p>Total Videos</p></div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card"><FaClock className="text-warning" /><h3>{stats.pending}</h3><p>Pending</p></div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-card"><FaUsers className="text-info" /><h3>{stats.users}</h3><p>Users</p></div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <button className={`tab-btn ${activeTab === 'pending' ? 'btn btn-warning' : 'btn btn-outline-secondary'}`} onClick={() => setActiveTab('pending')}>
          ⏳ Pending ({stats.pending})
        </button>
        <button className={`tab-btn ${activeTab === 'all' ? 'btn btn-primary' : 'btn btn-outline-secondary'}`} onClick={() => setActiveTab('all')}>
          📋 All Videos ({stats.total})
        </button>
      </div>

      {activeTab === 'all' && (
        <div className="d-flex flex-wrap gap-3 mb-4">
          <div className="position-relative flex-grow-1" style={{ minWidth: '150px' }}>
            <FaSearch className="position-absolute top-50 start-3 translate-middle-y text-muted" />
            <input type="text" className="form-control bg-secondary bg-opacity-25 text-white border-0 ps-5" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Form.Select className="bg-secondary bg-opacity-25 text-white border-0" style={{ width: 'auto', minWidth: '120px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </Form.Select>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="light" size="lg" /><p className="mt-3 text-muted">Loading...</p></div>
      ) : displayVideos.length === 0 ? (
        <div className="text-center py-5"><h5 className="text-success">✅ No videos</h5><p className="text-muted">No videos in this category</p></div>
      ) : (
        <div className="row g-3">
          {displayVideos.map((video) => (
            <div key={video.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="video-card h-100 d-flex flex-column">
                <div className="position-relative">
                  <img src={`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`} alt="Thumbnail" className="thumbnail" loading="lazy" />
                  <div className="position-absolute top-0 end-0 m-2 d-flex flex-column gap-1">
                    {getStatusBadge(video.status)}
                    {getTypeBadge(video.type)}
                  </div>
                </div>
                <div className="flex-grow-1 mt-2">
                  <h6 className="mb-1 text-truncate">@{video.users?.username || 'Unknown'}</h6>
                  {editingVideo === video.id ? (
                    <div className="d-flex gap-1">
                      <input type="text" className="form-control form-control-sm bg-dark text-white border-0" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Enter description" />
                      <button className="btn btn-success btn-sm" onClick={() => saveDescription(video.id)} disabled={processing[video.id]}><FaSave /></button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingVideo(null)}><FaTimesCircle /></button>
                    </div>
                  ) : (
                    <>
                      <p className="small text-muted text-truncate-2 mb-1">{video.description || 'No description'}</p>
                      <button className="btn btn-outline-light btn-sm" onClick={() => startEditDescription(video)}><FaEdit /> Edit Description</button>
                    </>
                  )}
                  <small className="text-muted d-block text-truncate">🕐 {new Date(video.created_at).toLocaleDateString()}</small>
                  {video.admin_notes && <small className="text-warning d-block text-truncate">📝 {video.admin_notes}</small>}
                </div>
                <div className="d-flex flex-wrap gap-1 mt-2">
                  {video.status === 'pending' && (
                    <>
                      <button className="btn btn-success btn-sm flex-grow-1" onClick={() => approveVideo(video.id)} disabled={processing[video.id]}>
                        {processing[video.id] === 'approving' ? <Spinner animation="border" size="sm" /> : <><FaCheck /> Approve</>}
                      </button>
                      <button className="btn btn-danger btn-sm flex-grow-1" onClick={() => rejectVideo(video.id)} disabled={processing[video.id]}>
                        {processing[video.id] === 'rejecting' ? <Spinner animation="border" size="sm" /> : <><FaTimes /> Reject</>}
                      </button>
                    </>
                  )}
                  <button className="btn btn-outline-light btn-sm flex-grow-1" onClick={() => window.open(`https://www.youtube.com/watch?v=${video.youtube_video_id}`, '_blank')}><FaEye /> Watch</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => deleteVideo(video.id)} disabled={processing[video.id]}>
                    {processing[video.id] === 'deleting' ? <Spinner animation="border" size="sm" /> : <FaTrash />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75 d-flex align-items-center justify-content-center p-3 z-3">
          <div className="bg-dark p-4 rounded-4 text-white" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>📱 Add Shorts</h5>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddShort}>
              <div className="mb-3">
                <label className="form-label">YouTube URL (Shorts)</label>
                <input type="url" className="form-control bg-secondary bg-opacity-25 text-white border-0" placeholder="https://www.youtube.com/shorts/..." value={newShortLink} onChange={(e) => setNewShortLink(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Content Type</label>
                <select className="form-select bg-secondary bg-opacity-25 text-white border-0" value={newShortType} onChange={(e) => setNewShortType(e.target.value)}>
                  <option value="shorts">📱 Shorts</option>
                  <option value="video">🎬 Regular Video</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Description (optional)</label>
                <input type="text" className="form-control bg-secondary bg-opacity-25 text-white border-0" placeholder="Enter description" value={newShortDescription} onChange={(e) => setNewShortDescription(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={addingShort}>
                {addingShort ? 'Adding...' : '🚀 Add Shorts'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

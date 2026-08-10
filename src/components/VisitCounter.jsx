import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { FaTimes, FaFire } from "react-icons/fa";

const VisitCounter = () => {
  const [visits, setVisits] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const { data, error } = await supabase
          .from("site_stats")
          .select("visit_count")
          .eq("id", 1)
          .single();

        if (error) throw error;

        const currentCount = data?.visit_count || 0;
        const newCount = currentCount + 1;

        const { error: updateError } = await supabase
          .from("site_stats")
          .update({
            visit_count: newCount,
            updated_at: new Date().toISOString(),
          })
          .eq("id", 1);

        if (updateError) throw updateError;

        setVisits(newCount);

        const alreadyShown = sessionStorage.getItem("visitPopupShown");
        if (!alreadyShown) {
          setShowPopup(true);
          sessionStorage.setItem("visitPopupShown", "true");
        }
      } catch (error) {
        console.error("Error tracking visit:", error);
        const localCount = localStorage.getItem("localVisitCount");
        const newLocalCount = localCount ? parseInt(localCount) + 1 : 1;
        localStorage.setItem("localVisitCount", newLocalCount);
        setVisits(newLocalCount);

        const alreadyShown = sessionStorage.getItem("visitPopupShown");
        if (!alreadyShown) {
          setShowPopup(true);
          sessionStorage.setItem("visitPopupShown", "true");
        }
      } finally {
        setLoading(false);
      }
    };

    trackVisit();
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (loading) return null;

  return (
    <>
      {showPopup && (
        <div className="visit-popup-overlay" onClick={handleClose}>
          <div className="visit-popup" onClick={(e) => e.stopPropagation()}>
            <button className="visit-popup-close" onClick={handleClose}>
              <FaTimes />
            </button>

            <div className="visit-popup-icon">🎉</div>

            <h2 className="visit-popup-title">Welcome! 👋</h2>

            <p className="visit-popup-text">We're happy to have you with us!</p>

            <div className="visit-popup-counter">
              <FaFire className="visit-popup-fire" />
              <span className="visit-popup-number">{visits}</span>
              <span className="visit-popup-label">Visits</span>
            </div>

            <p className="visit-popup-subtext">
              Thank you for being part of our educational journey! 🚀
            </p>

            <button className="visit-popup-btn" onClick={handleClose}>
              Continue Browsing
            </button>
          </div>
        </div>
      )}
    </>
  );
};
// Exporting Function for Other Pages
export default VisitCounter;

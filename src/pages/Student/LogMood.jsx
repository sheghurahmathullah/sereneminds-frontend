import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import "./Student.css";

const LogMood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    feelingDescription: "",
    parentCategory: "",
    pleasantness: 4,
    impact: 4,
    emotion: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const textareaRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Comprehensive mood definitions
  const moodDefinitions = [
    {
      mood: "Enraged",
      description:
        "Feeling extremely angry and out of control. It's like your anger has reached its highest point, and you can't calm down.",
    },
    {
      mood: "Furious",
      description:
        "Very, very angry. It's a stronger feeling than just being mad or annoyed, almost like an explosive emotion.",
    },
    {
      mood: "Fuming",
      description:
        "Showing strong anger, almost like smoke coming out of your ears. You're so upset that it's hard to stay calm.",
    },
    {
      mood: "Disgusted",
      description:
        "Feeling very upset or sickened by something. It's like you can't stand what's happening or what you're experiencing.",
    },
    {
      mood: "Frightened",
      description:
        "Feeling scared or afraid. It's when something makes you feel really uneasy and worried about what might happen.",
    },
    {
      mood: "Lonely",
      description:
        "Feeling sad because you're alone or disconnected from others. It's a deep sense of isolation where you miss having someone around.",
    },
    {
      mood: "Depressed",
      description:
        "Feeling very sad for a long time. It's a heavy sadness that seems to stick with you and makes everything seem dull.",
    },
    {
      mood: "Panicked",
      description:
        "Feeling sudden and intense fear or worry. It's when you're overwhelmed and find it hard to think clearly or stay calm.",
    },
    {
      mood: "Nervous",
      description:
        "Feeling worried or uneasy about something. It's like having butterflies in your stomach because you're anxious about what's coming up.",
    },
    {
      mood: "Frustrated",
      description:
        "Feeling upset because things aren't going as planned. It's a mix of annoyance and disappointment when you hit obstacles or problems.",
    },
    {
      mood: "Angry",
      description:
        "Feeling strong displeasure or annoyance. It's when something bothers you a lot and makes you feel upset.",
    },
    {
      mood: "Worried",
      description:
        "Feeling anxious or concerned about something that might happen. It's when you're preoccupied with thoughts of potential problems or issues.",
    },
    {
      mood: "Miserable",
      description:
        "Feeling extremely unhappy or uncomfortable. It's a deep sense of unhappiness that makes everything seem worse.",
    },
    {
      mood: "Discouraged",
      description:
        "Feeling disheartened or lacking confidence. It's like losing hope or motivation because things aren't going as you hoped.",
    },
    {
      mood: "Shocked",
      description:
        "Feeling surprised or disturbed by something unexpected. It's a sudden, intense reaction to something that catches you off guard.",
    },
    {
      mood: "Restless",
      description:
        "Feeling unable to relax or stay still. It's like having too much energy or worry, making it hard to find calm or comfort.",
    },
    {
      mood: "Irritated",
      description:
        "Feeling annoyed or bothered by something. It's a persistent sense of discomfort or frustration, even if it's not overwhelming.",
    },
    {
      mood: "Disappointed",
      description:
        "Feeling sad because something didn't turn out as expected. It's when reality falls short of what you hoped for or anticipated.",
    },
    {
      mood: "Concerned",
      description:
        "Feeling worried about something. It's a mild form of anxiety or care about a situation that's important to you.",
    },
    {
      mood: "Tired",
      description:
        "Feeling like you need rest or sleep. It's when your energy is low, and you might feel drained but not necessarily unhappy.",
    },
    {
      mood: "Exhausted",
      description:
        "Feeling extremely tired. It's a state of being so low on energy that you need a lot of rest to recover.",
    },
    {
      mood: "Hyper",
      description:
        "Feeling overly energetic and excited. It's like having too much energy to stay still and being really animated.",
    },
    {
      mood: "Lively",
      description:
        "Feeling full of energy and enthusiasm. It's a sense of being excited and active, bringing a lot of spirit to whatever you're doing.",
    },
    {
      mood: "Energized",
      description:
        "Feeling full of energy and ready to go. It's when you feel awake, active, and motivated to take on tasks.",
    },
    {
      mood: "Satisfied",
      description:
        "Feeling pleased with how things are going. It's a sense of contentment and happiness with what you've achieved or have.",
    },
    {
      mood: "Complacent",
      description:
        "Feeling satisfied but maybe a bit too comfortable. It's when you're okay with the way things are and not seeking change or improvement.",
    },
    {
      mood: "Bored",
      description:
        "Feeling uninterested or restless because nothing is happening. It's a sense of dullness and lack of engagement with what's around you.",
    },
    {
      mood: "Uneasy",
      description:
        "Feeling slightly worried or uncomfortable. It's a mild sense of discomfort or nervousness that makes you feel unsettled.",
    },
    {
      mood: "Surprised",
      description:
        "Feeling astonished or amazed by something unexpected. It's a reaction to something that catches you off guard in a surprising way.",
    },
    {
      mood: "Enthusiastic",
      description:
        "Feeling excited and eager about something. It's a high level of interest and energy about a topic or activity.",
    },
    {
      mood: "Cheerful",
      description:
        "Feeling happy and full of joy. It's a bright and positive mood that makes you feel good and spread positivity.",
    },
    {
      mood: "Optimistic",
      description:
        "Feeling hopeful about the future. It's a positive outlook where you believe things will get better, even if there are challenges.",
    },
    {
      mood: "Focused",
      description:
        "Feeling concentrated and attentive to a task. It's being deeply engaged and determined to achieve something, without distractions.",
    },
    {
      mood: "Thoughtful",
      description:
        "Feeling considerate and reflective. It's when you carefully think about others' feelings or ideas and act with care.",
    },
    {
      mood: "Relaxed",
      description:
        "Feeling calm and at ease. It's a state where you're free from stress and worry, and you feel comfortable and serene.",
    },
    {
      mood: "Inspired",
      description:
        "Feeling motivated and excited by something or someone. It's when you're driven to act or create because you've been deeply moved.",
    },
    {
      mood: "Motivated",
      description:
        "Feeling driven to take action or achieve goals. It's a strong desire to pursue your goals and work towards what you want.",
    },
    {
      mood: "Proud",
      description:
        "Feeling pleased with something you or someone else has done. It's a sense of accomplishment and self-worth that comes from achievement.",
    },
    {
      mood: "Joyful",
      description:
        "Feeling great happiness and delight. It's an intense feeling of pleasure and contentment that brightens your day.",
    },
    {
      mood: "Peaceful",
      description:
        "Feeling calm and free from worry. It's a state of tranquility and quiet where you feel relaxed and at ease.",
    },
    {
      mood: "Hopeful",
      description:
        "Feeling optimistic about the future. It's a positive belief that things will improve and that better days are ahead.",
    },
    {
      mood: "Comfortable",
      description:
        "Feeling relaxed and at ease. It's when you're in a state of physical or emotional well-being and feel content.",
    },
    {
      mood: "Exhilarated",
      description:
        "Feeling extremely happy and excited. It's an intense and thrilling sense of joy and energy.",
    },
    {
      mood: "Thrilled",
      description:
        "Feeling very excited and happy. It's a high level of joy and enthusiasm about something exciting.",
    },
    {
      mood: "Blissful",
      description:
        "Feeling perfect happiness and contentment. It's an overwhelming sense of joy and peace that feels just right.",
    },
    {
      mood: "Grateful",
      description:
        "Feeling thankful for something. It's recognizing and appreciating the good things in your life and feeling appreciative.",
    },
    {
      mood: "Touched",
      description:
        "Feeling emotionally moved or affected by something. It's a deep sense of appreciation or warmth that impacts you deeply.",
    },
    {
      mood: "Carefree",
      description:
        "Feeling relaxed and without worries. It's a state of lightheartedness where you don't have any major concerns.",
    },
    {
      mood: "Serene",
      description:
        "Feeling calm and peaceful. It's a deep sense of tranquility and stillness where you feel completely at ease.",
    },
    // Additional moods
    {
      mood: "Anxious",
      description:
        "Feeling worried or nervous about something uncertain. It's a sense of unease about what might happen.",
    },
    {
      mood: "Stressed",
      description:
        "Feeling overwhelmed by pressure or demands. It's when you have too much to handle and feel tense.",
    },
    {
      mood: "Overwhelmed",
      description:
        "Feeling like you have too much to deal with. It's when everything seems too much to handle at once.",
    },
    {
      mood: "Confused",
      description:
        "Feeling uncertain or unclear about something. It's when you don't understand what's happening or what to do.",
    },
    {
      mood: "Embarrassed",
      description:
        "Feeling self-conscious or ashamed about something. It's when you feel awkward or uncomfortable in a situation.",
    },
    {
      mood: "Guilty",
      description:
        "Feeling responsible for something wrong. It's a sense of regret or remorse about your actions or decisions.",
    },
    {
      mood: "Ashamed",
      description:
        "Feeling deeply embarrassed or humiliated. It's a strong sense of regret or dishonor about something you've done.",
    },
    {
      mood: "Jealous",
      description:
        "Feeling envious of someone else. It's when you want what someone else has or feel threatened by their success.",
    },
    {
      mood: "Resentful",
      description:
        "Feeling bitter or angry about something unfair. It's holding onto negative feelings about a past wrong.",
    },
    {
      mood: "Betrayed",
      description:
        "Feeling hurt by someone you trusted. It's when someone you cared about has let you down or broken your trust.",
    },
    {
      mood: "Hurt",
      description:
        "Feeling emotional pain or distress. It's when something or someone has caused you to feel wounded emotionally.",
    },
    {
      mood: "Vulnerable",
      description:
        "Feeling exposed or unprotected. It's when you feel open to being hurt or criticized.",
    },
    {
      mood: "Insecure",
      description:
        "Feeling uncertain about yourself or your abilities. It's a lack of confidence or self-doubt.",
    },
    {
      mood: "Inadequate",
      description:
        "Feeling like you're not good enough. It's a sense that you don't measure up to what's expected or needed.",
    },
    {
      mood: "Hopeless",
      description:
        "Feeling like there's no way things will get better. It's a deep sense of despair and lack of optimism.",
    },
    {
      mood: "Helpless",
      description:
        "Feeling unable to change or control a situation. It's when you feel powerless to make things better.",
    },
    {
      mood: "Numb",
      description:
        "Feeling emotionally disconnected or empty. It's when you can't feel emotions strongly, often as a defense mechanism.",
    },
    {
      mood: "Empty",
      description:
        "Feeling like something is missing inside. It's a sense of void or lack of meaning or purpose.",
    },
    {
      mood: "Melancholic",
      description:
        "Feeling a deep, thoughtful sadness. It's a pensive sadness that's often reflective and contemplative.",
    },
    {
      mood: "Grief-stricken",
      description:
        "Feeling intense sorrow, especially from loss. It's deep sadness and mourning over something or someone lost.",
    },
    {
      mood: "Content",
      description:
        "Feeling satisfied and at peace. It's a sense of happiness and fulfillment with your current situation.",
    },
    {
      mood: "Calm",
      description:
        "Feeling peaceful and relaxed. It's a state of tranquility without stress or worry.",
    },
    {
      mood: "Tranquil",
      description:
        "Feeling calm and peaceful. It's a deep sense of quiet and serenity.",
    },
    {
      mood: "Centered",
      description:
        "Feeling balanced and grounded. It's a sense of being in control and at peace with yourself.",
    },
    {
      mood: "Balanced",
      description:
        "Feeling stable and in harmony. It's when different aspects of your life feel in equilibrium.",
    },
    {
      mood: "Confident",
      description:
        "Feeling sure of yourself and your abilities. It's a strong belief in your own skills and judgment.",
    },
    {
      mood: "Empowered",
      description:
        "Feeling strong and capable. It's a sense of having the power and confidence to achieve your goals.",
    },
    {
      mood: "Determined",
      description:
        "Feeling resolute and committed to a goal. It's having a strong will to succeed despite challenges.",
    },
    {
      mood: "Ambitious",
      description:
        "Feeling driven to achieve great things. It's having strong desires and goals for success.",
    },
    {
      mood: "Excited",
      description:
        "Feeling enthusiastic and eager. It's a high level of anticipation and positive energy about something.",
    },
    {
      mood: "Eager",
      description:
        "Feeling keen and enthusiastic. It's wanting to do something very much and looking forward to it.",
    },
    {
      mood: "Curious",
      description:
        "Feeling interested in learning or discovering something. It's a desire to know more about something.",
    },
    {
      mood: "Playful",
      description:
        "Feeling fun-loving and lighthearted. It's a sense of wanting to have fun and enjoy yourself.",
    },
    {
      mood: "Silly",
      description:
        "Feeling goofy and carefree. It's a lighthearted mood where you want to laugh and have fun.",
    },
    {
      mood: "Giddy",
      description:
        "Feeling lighthearted and silly with excitement. It's a bubbly, excited feeling that makes you feel happy.",
    },
    {
      mood: "Ecstatic",
      description:
        "Feeling extremely happy and excited. It's an overwhelming sense of joy and elation.",
    },
    {
      mood: "Euphoric",
      description:
        "Feeling intense happiness and well-being. It's an overwhelming sense of joy and excitement.",
    },
    {
      mood: "Radiant",
      description:
        "Feeling glowing with happiness. It's when your joy is so strong it shows in your expression and energy.",
    },
    {
      mood: "Loved",
      description:
        "Feeling cared for and valued by others. It's a warm sense of being appreciated and cherished.",
    },
    {
      mood: "Appreciated",
      description:
        "Feeling recognized and valued. It's when you feel that others see and value your contributions.",
    },
    {
      mood: "Valued",
      description:
        "Feeling important and appreciated. It's a sense that you matter and are respected by others.",
    },
    {
      mood: "Supported",
      description:
        "Feeling helped and encouraged by others. It's knowing that people are there for you and believe in you.",
    },
    {
      mood: "Understood",
      description:
        "Feeling that others truly get you. It's when someone comprehends your feelings, thoughts, or situation.",
    },
    {
      mood: "Accepted",
      description:
        "Feeling welcomed and included. It's a sense of belonging and being embraced for who you are.",
    },
    {
      mood: "Connected",
      description:
        "Feeling close to others. It's a sense of having meaningful relationships and bonds with people.",
    },
  ];

  // Emotion options matching the design
  const emotions = [
    { id: "angry", name: "Angry", color: "#e74c3c" },
    { id: "anxious", name: "Anxious", color: "#8B4513" },
    { id: "sad", name: "Sad", color: "#e67e22" },
    { id: "joy", name: "Joy", color: "#2ecc71" },
    { id: "calm", name: "Calm", color: "#3498db" },
  ];

  // Get pleasantness label
  const getPleasantnessLabel = (value) => {
    if (value <= 2) return "Very Low";
    if (value <= 3) return "Low";
    if (value <= 4) return "Neutral";
    if (value <= 5) return "Moderate";
    if (value <= 6) return "High";
    return "Very High";
  };

  // Get impact label
  const getImpactLabel = (value) => {
    if (value <= 2) return "Very Low";
    if (value <= 3) return "Low";
    if (value <= 4) return "Neutral";
    if (value <= 5) return "Moderate";
    if (value <= 6) return "High";
    return "Very High";
  };

  // Handle feeling description input change
  const handleFeelingDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, feelingDescription: value });

    // Show suggestions if user is typing
    if (value.trim().length > 0) {
      const filtered = moodDefinitions.filter(
        (mood) =>
          mood.mood.toLowerCase().includes(value.toLowerCase()) ||
          mood.description.toLowerCase().includes(value.toLowerCase())
      );
      setAutocompleteSuggestions(filtered.slice(0, 5)); // Show top 5 matches
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
      setAutocompleteSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (mood) => {
    setFormData({
      ...formData,
      feelingDescription: `${mood.mood}: ${mood.description}`,
    });
    setShowSuggestions(false);
    setAutocompleteSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || autocompleteSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < autocompleteSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionSelect(autocompleteSuggestions[selectedSuggestionIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        textareaRef.current &&
        !textareaRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmotionSelect = (emotionId) => {
    setFormData({ ...formData, emotion: emotionId });
  };

  const handleSubmit = () => {
    if (!formData.feelingDescription.trim()) {
      alert("Please describe how you feel");
      return;
    }
    if (!formData.emotion) {
      alert("Please select an emotion");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    // Submit logic here
    alert("Mood logged successfully!");
    navigate("/student/mood-history");
  };

  return (
    <div className="student-container">
      {/* Main Form Container */}
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "32px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 32px 0",
            color: "#222",
          }}
        >
          How are you feeling today?
        </h2>

        {/* Feeling Description Input */}
        <div
          className="form-group"
          style={{ marginBottom: "28px", position: "relative" }}
        >
          <textarea
            ref={textareaRef}
            className="form-textarea"
            placeholder="Type how you feel right now..."
            value={formData.feelingDescription}
            onChange={handleFeelingDescriptionChange}
            onKeyDown={handleKeyDown}
            style={{
              minHeight: "120px",
              fontSize: "16px",
              fontStyle: formData.feelingDescription ? "normal" : "italic",
              color: formData.feelingDescription ? "#222" : "#999",
            }}
          />
          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && autocompleteSuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                marginTop: "4px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {autocompleteSuggestions.map((mood, index) => (
                <div
                  key={mood.mood}
                  onClick={() => handleSuggestionSelect(mood)}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderBottom:
                      index < autocompleteSuggestions.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                    background:
                      index === selectedSuggestionIndex ? "#f5f5f5" : "#fff",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  onMouseLeave={() => setSelectedSuggestionIndex(-1)}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#222",
                      marginBottom: "4px",
                    }}
                  >
                    {mood.mood}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: "1.4",
                    }}
                  >
                    {mood.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Parent Category Input */}
        <div className="form-group" style={{ marginBottom: "32px" }}>
          <label
            className="form-label"
            style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
          >
            Parent category (auto-suggested)
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Health, Friends, Family"
            value={formData.parentCategory}
            onChange={(e) =>
              setFormData({ ...formData, parentCategory: e.target.value })
            }
          />
        </div>

        {/* Pleasantness Slider */}
        <div className="slider-group" style={{ marginBottom: "32px" }}>
          <div className="slider-label" style={{ marginBottom: "16px" }}>
            <label
              className="form-label"
              style={{ fontSize: "16px", fontWeight: "600", color: "#444" }}
            >
              Pleasantness
            </label>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#444",
              }}
            >
              {getPleasantnessLabel(formData.pleasantness)} (
              {formData.pleasantness}/7)
            </span>
          </div>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              type="range"
              min="1"
              max="7"
              value={formData.pleasantness}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pleasantness: parseInt(e.target.value),
                })
              }
              className="slider-gradient"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#666",
                marginTop: "8px",
              }}
            >
              <span>Very Low</span>
              <span>Neutral</span>
              <span>Very High</span>
            </div>
          </div>
        </div>

        {/* Impact Slider */}
        <div className="slider-group" style={{ marginBottom: "32px" }}>
          <div className="slider-label" style={{ marginBottom: "16px" }}>
            <label
              className="form-label"
              style={{ fontSize: "16px", fontWeight: "600", color: "#444" }}
            >
              Impact
            </label>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#444",
              }}
            >
              {getImpactLabel(formData.impact)} ({formData.impact}/7)
            </span>
          </div>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              type="range"
              min="1"
              max="7"
              value={formData.impact}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  impact: parseInt(e.target.value),
                })
              }
              className="slider-gradient"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#666",
                marginTop: "8px",
              }}
            >
              <span>Very Low</span>
              <span>Neutral</span>
              <span>Very High</span>
            </div>
          </div>
        </div>

        {/* Emotion Selection */}
        <div style={{ marginBottom: "32px" }}>
          <label
            className="form-label"
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#444",
              marginBottom: "16px",
              display: "block",
            }}
          >
            Choose the closest emotion
          </label>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {emotions.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => handleEmotionSelect(emotion.id)}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: emotion.color,
                  color: "#fff",
                  border:
                    formData.emotion === emotion.id ? "3px solid #fff" : "none",
                  boxShadow:
                    formData.emotion === emotion.id
                      ? `0 0 0 3px ${emotion.color}, 0 4px 12px rgba(0,0,0,0.2)`
                      : "0 2px 8px rgba(0,0,0,0.15)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.25)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    formData.emotion === emotion.id
                      ? `0 0 0 3px ${emotion.color}, 0 4px 12px rgba(0,0,0,0.2)`
                      : "0 2px 8px rgba(0,0,0,0.15)";
                }}
              >
                {emotion.name}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/student/dashboard")}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Mood Log
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Mood Log</h3>
              <button
                className="modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "grid", gap: "16px" }}>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "4px",
                      }}
                    >
                      Feeling Description
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      {formData.feelingDescription || "N/A"}
                    </div>
                  </div>
                  {formData.parentCategory && (
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          marginBottom: "4px",
                        }}
                      >
                        Parent Category
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        {formData.parentCategory}
                      </div>
                    </div>
                  )}
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "4px",
                      }}
                    >
                      Emotion
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      {emotions.find((e) => e.id === formData.emotion)?.name ||
                        "N/A"}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginBottom: "4px",
                      }}
                    >
                      Pleasantness & Impact
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      Pleasantness: {formData.pleasantness}/7 | Impact:{" "}
                      {formData.impact}/7
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Please review your mood log details before submitting.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Go Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <FiCheck /> Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogMood;

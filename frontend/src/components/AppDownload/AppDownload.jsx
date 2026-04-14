import React from 'react'
import './AppDownload.css'
import {assets} from '../../assets/assets'

const AppDownload = () => {
  const studentFeatures = [
    {
      label: "Home State Cravings",
      title: "Choose your home state",
      text: "Set Maharashtra, Bihar, Punjab, Bengal or any region and see familiar meals first.",
      meta: "Personalized menu"
    },
    {
      label: "Monthly Tiffin Plan",
      title: "Lunch + dinner made simple",
      text: "Pick lunch only, dinner only or both, with healthy regional meals on repeat.",
      meta: "Student budget"
    },
    {
      label: "Skip Today",
      title: "Pause without cancelling",
      text: "Going home, eating outside or busy with college events? Skip one meal in a tap.",
      meta: "No food waste"
    }
  ];

  return (
    <div className='app-download' id='app-download'>
      <div className="app-download-content">
        <p className="app-download-eyebrow">Student app features</p>
        <h2>Built for hostel life, not just food delivery.</h2>
        <p className="app-download-text">
          Save your hostel address, choose your home-state cravings, subscribe
          to a healthy tiffin plan and skip meals when plans change.
        </p>

        <div className="student-feature-grid">
          {studentFeatures.map((feature) => (
            <article className="student-feature-card" key={feature.label}>
              <span>{feature.label}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <strong>{feature.meta}</strong>
            </article>
          ))}
        </div>

        <div className="student-app-preview" aria-label="Student app preview">
          <div className="preview-phone">
            <div className="preview-pill">Today</div>
            <h3>Hi, hosteller</h3>
            <p>Your Maharashtra comfort plan is ready.</p>
            <div className="preview-row">
              <span>Lunch</span>
              <strong>Varan Bhaat</strong>
            </div>
            <div className="preview-row">
              <span>Dinner</span>
              <strong>Matki Usal Roti</strong>
            </div>
            <button type="button">Skip today's dinner</button>
          </div>
        </div>
      </div>

      <div className="app-download-platforms">
        <img src={assets.play_store} alt='' />
        <img src={assets.app_store} alt='' />
      </div>
    </div>
  )
}

export default AppDownload

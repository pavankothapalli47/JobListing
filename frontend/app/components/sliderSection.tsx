"use client";
import React from "react";
import styles from "@/app/styles/sliderSection.module.css";

const SliderSection = () => {
  const companyLogos = [
    "Byjus.png",
    "Amazon.png",
    "Capgemini.png",
    "Genpact.png",
    "Google.png",
    "Tcs.png",
    "Wipro.png",
    "Zensar.png",
    "Unacademy.png",
    "upGrad.png",
    "barbeque.png",
    "Justdial.png",
    "Aditya.png",
    "Accenture.png",
    "Solix.png",
    "Emagia.png",
    "Touchalife.png",
    "Talradio.png",
    "Talscouts.png",
    "Samsung.png",
    "Facebook.png",
    "Flipkart.png",
    "Zoho.png",
    "Vivo.png",
    "Hsbc.png",
    "Jpmorgan.png",
    "cyient.png",
  ];

  return (
    <div>
      <h1 className={styles.heading}>Our Employer network includes..</h1>
      <p className={styles.para}>
        MNCs that you wanted to work for, Unicorns that you followed on the
        news, startups
        <br />
        and soon-icorns that can unlock the potential in you.
      </p>
      <div className={styles.carousel_container}>
        <div className={styles.logo_row}>
          {companyLogos.map((logo, index) => (
            <div key={index} className={styles.logo_column}>
              <img
                src={logo}
                alt={`Company Logo ${index}`}
                className={styles.logo_image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;

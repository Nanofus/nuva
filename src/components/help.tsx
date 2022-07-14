import React from "react";
import { useEffect } from "react";
import ReactTooltip from "react-tooltip";

const Help = ({ onClose }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  return (
    <div className="window helpWrapper">
      <div className="iconRow">
        <i className="icon fas fa-times" data-tip="Sulje" onClick={() => onClose(false)}></i>
      </div>
      <hr className="separator" />
      <div className="helpContent">
        <h2>Uusi Klaanon-sivu</h2>
        <span>Kepe teki vähän juttuja. Seuraavassa puuttuvat featuret, ei missään erityisessä järjestyksessä.</span>
        <ul className="list">
          <li>Kommenttien postaaminen</li>
          <li>Kaikkien postausten listan sivutus</li>
          <li>Päivämäärät vanhan ropen postien nimiin</li>
          <li>Uudet kommentit näkyviin</li>
          <li>Viestien kommenttimäärät etusivulle</li>
          <li>Viestin creditsit monipuolisemmiksi ja selkeämmiksi (kirjoittajat, kuvittajat jne.)</li>
          <li>Tagipilven kuratointi (kunnon tagit ja meemitagit)</li>
          <li>"Yksityisyys-hätäkytkin"</li>
          <li>Enemmän esikatselukuvia etusivulle, blur pois (se on tällä hetkellä placeholder)</li>
          <li>Kirjanmerkit</li>
          <li>Teemat</li>
          <li>Tilastosivu</li>
          <li>Esimääritellyt tyylit</li>
          <li>Menun pinnaus</li>
          <li>Musiikkisoittimen tyyli</li>
          <li>Nenyn käyttäjätietojen haku epäonnistuu koska tältä ei ole yhtään ropepostia</li>
        </ul>
        <span>Sivu tehty <a href="https://www.gatsbyjs.com/" target="_blank">Gatsbylla</a> ja <a href="https://reactjs.org/" target="_blank">Reactilla</a>.</span>
      </div>
    </div>
  );
}

export default Help;

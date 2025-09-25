(function () {
  const STORAGE_KEY = "cookie-consent";

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function getStoredPreferences() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn("Impossible de lire les préférences cookies", error);
      return null;
    }
  }

  function storePreferences(preferences) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.warn("Impossible d'enregistrer les préférences cookies", error);
    }
  }

  function applyPreferences(preferences) {
    document.documentElement.dataset.cookieAnalytics = preferences.analytics;
  }

  function updateBannerCopy(banner, mode) {
    const title = banner.querySelector("[data-banner-title]");
    const text = banner.querySelector("[data-banner-text]");
    if (!title || !text) return;

    if (mode === "manage") {
      title.textContent = "Gérer mes préférences cookies";
      text.textContent =
        "Vous pouvez ajuster à tout moment vos préférences concernant les traceurs utilisés pour améliorer notre service.";
    } else {
      title.textContent = "Nous respectons votre vie privée";
      text.textContent =
        "Nous utilisons des cookies pour assurer le bon fonctionnement du site et mesurer l'audience de nos audits marketing.";
    }
  }

  function toggleBanner(banner, show, mode) {
    if (!banner) return;
    if (show) {
      banner.dataset.mode = mode || "prompt";
      updateBannerCopy(banner, banner.dataset.mode);
      banner.classList.add("is-visible");
      document.body.classList.add("no-scroll");
      const focusable = banner.querySelector("button");
      if (focusable) {
        try {
          focusable.focus({ preventScroll: true });
        } catch (error) {
          focusable.focus();
        }
      }
    } else {
      banner.classList.remove("is-visible");
      document.body.classList.remove("no-scroll");
    }
  }

  function collectPreferences(container) {
    const toggles = container.querySelectorAll("[data-cookie-toggle]");
    return Array.from(toggles).reduce(
      (prefs, toggle) => {
        const category = toggle.getAttribute("data-cookie-toggle");
        prefs[category] = toggle.checked;
        return prefs;
      },
      {}
    );
  }

  function setPreferencesFromObject(container, preferences) {
    const toggles = container.querySelectorAll("[data-cookie-toggle]");
    toggles.forEach((toggle) => {
      const category = toggle.getAttribute("data-cookie-toggle");
      if (category in preferences) {
        toggle.checked = Boolean(preferences[category]);
      }
    });
  }

  ready(function () {
    const banner = document.querySelector(".cookie-banner");
    if (!banner) {
      return;
    }

    const manageButtons = document.querySelectorAll(".manage-cookies");
    const acceptButton = banner.querySelector('[data-action="accept"]');
    const rejectButton = banner.querySelector('[data-action="reject"]');
    const saveButton = banner.querySelector('[data-action="save"]');
    const preferencesContainer = banner.querySelector(".cookie-options");

    const storedPrefs = getStoredPreferences();
    if (storedPrefs) {
      setPreferencesFromObject(preferencesContainer, storedPrefs);
      applyPreferences(storedPrefs);
    } else {
      toggleBanner(banner, true, "prompt");
    }

    manageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setPreferencesFromObject(preferencesContainer, getStoredPreferences() || { analytics: false });
        toggleBanner(banner, true, "manage");
      });
    });

    if (acceptButton) {
      acceptButton.addEventListener("click", () => {
        const prefs = { analytics: true };
        setPreferencesFromObject(preferencesContainer, prefs);
        storePreferences(prefs);
        applyPreferences(prefs);
        toggleBanner(banner, false);
      });
    }

    if (rejectButton) {
      rejectButton.addEventListener("click", () => {
        const prefs = { analytics: false };
        setPreferencesFromObject(preferencesContainer, prefs);
        storePreferences(prefs);
        applyPreferences(prefs);
        toggleBanner(banner, false);
      });
    }

    if (saveButton) {
      saveButton.addEventListener("click", () => {
        const prefs = collectPreferences(preferencesContainer);
        storePreferences(prefs);
        applyPreferences(prefs);
        toggleBanner(banner, false);
      });
    }

    banner.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        toggleBanner(banner, false);
      }
    });
  });
})();

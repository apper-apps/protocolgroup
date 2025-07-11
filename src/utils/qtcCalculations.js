export const qtcCalculations = {
  bazett: (qtInterval, rrInterval) => {
    return qtInterval / Math.sqrt(rrInterval / 1000);
  },

  fridericia: (qtInterval, rrInterval) => {
    return qtInterval / Math.pow(rrInterval / 1000, 1/3);
  },

  framingham: (qtInterval, rrInterval) => {
    return qtInterval + 0.154 * (1000 - rrInterval);
  },

  hodges: (qtInterval, heartRate) => {
    return qtInterval + 1.75 * (heartRate - 60);
  },

  getInterpretation: (qtcValue, gender = "male") => {
    const ranges = {
      male: { normal: 440, borderline: 460 },
      female: { normal: 460, borderline: 480 }
    };

    const range = ranges[gender];
    
    if (qtcValue <= range.normal) {
      return { status: "normal", label: "Normal", severity: "low" };
    } else if (qtcValue <= range.borderline) {
      return { status: "borderline", label: "Borderline", severity: "medium" };
    } else {
      return { status: "prolonged", label: "Prolonged", severity: "high" };
    }
  },

  validateInputs: (qtInterval, heartRate) => {
    const errors = {};

    if (qtInterval < 200 || qtInterval > 600) {
      errors.qtInterval = "QT interval should be between 200-600 ms";
    }

    if (heartRate < 40 || heartRate > 200) {
      errors.heartRate = "Heart rate should be between 40-200 bpm";
    }

    return errors;
  },

  convertBoxesToMs: (boxes) => {
    return boxes * 40; // Each small box = 0.04 seconds = 40ms
  },

  convertMsToBoxes: (ms) => {
    return ms / 40;
  }
};
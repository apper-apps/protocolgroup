import formulasData from "@/services/mockData/formulas.json";
import rangesData from "@/services/mockData/referenceRanges.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const qtcService = {
  async getFormulas() {
    await delay(200);
    return [...formulasData];
  },

  async getReferenceRanges() {
    await delay(250);
    return [...rangesData];
  },

  async calculateQTc(qtInterval, heartRate, formula = "Bazett") {
    await delay(100);
    
    if (qtInterval <= 0 || heartRate <= 0) {
      throw new Error("Invalid input values");
    }

    const rrInterval = 60000 / heartRate; // Convert to milliseconds
    let qtc = 0;

    switch (formula) {
      case "Bazett":
        qtc = qtInterval / Math.sqrt(rrInterval / 1000);
        break;
      case "Fridericia":
        qtc = qtInterval / Math.pow(rrInterval / 1000, 1/3);
        break;
      case "Framingham":
        qtc = qtInterval + 0.154 * (1000 - rrInterval);
        break;
      default:
        qtc = qtInterval / Math.sqrt(rrInterval / 1000);
    }

    return {
      qtc: Math.round(qtc),
      qtInterval,
      heartRate,
      rrInterval: Math.round(rrInterval),
      formula,
      timestamp: new Date().toISOString()
};
  },

  async calculateFromRRInterval(rrInterval, qtInterval, formula = "Bazett") {
    await delay(100);
    
    if (rrInterval <= 0 || qtInterval <= 0) {
      throw new Error("Invalid input values");
    }

    const heartRate = Math.round(60000 / rrInterval);
    
    // Use existing calculateQTc method
    const result = await this.calculateQTc(qtInterval, heartRate, formula);
    
    return {
      ...result,
      rrInterval: Math.round(rrInterval),
      inputMethod: "rrInterval"
    };
  }
};
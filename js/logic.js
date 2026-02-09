window.DIAGNOSIS = {
  calculate(answers) {
    const scores = {};
    const polarity = { in: 0, out: 0 };

    answers.forEach(a => {
      if (a.polarity) {
        polarity[a.polarity]++;
      }
      if (a.score) {
        scores[a.score] = (scores[a.score] || 0) + 1;
      }
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    return {
      primary: sorted[0]?.[0] || null,
      secondary: sorted[1]?.[0] || null,
      polarity: polarity.out >= polarity.in ? "out" : "in",
      scores
    };
  }
};


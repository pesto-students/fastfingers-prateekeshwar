const getMaximumScoreObj = (scoreList) => {
    const maxScoreObj = scoreList.reduce((prev, current) => {
        const prevMinutes = Number(prev.score.split(':')[0]);
        const prevSeconds = Number(prev.score.split(':')[1]);
        const currMinutes = Number(current.score.split(':')[0]);
        const currSeconds = Number(current.score.split(':')[1]);
        if (prevMinutes !== currMinutes) {
          return prevMinutes > currMinutes ? prev : current;
        }
        if (prevSeconds !== currSeconds) {
          return prevSeconds > currSeconds ? prev : current;
        }
        return prev;
      });
      return maxScoreObj
}

export default getMaximumScoreObj
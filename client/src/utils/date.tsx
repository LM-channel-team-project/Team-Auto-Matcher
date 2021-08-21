const getKoreaTime = (time: Date) => {
  const date = new Date(time);
  const utc = date.getTime();
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  return new Date(utc + koreaTimeDiff).toISOString().substring(0, 10);
};

export default getKoreaTime;

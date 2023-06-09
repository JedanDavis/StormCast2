export const getSunTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    let hours: string;
    let minutes = date.getMinutes().toString();
    let period: string;
  
    if (date.getHours() < 12) {
      hours = date.getHours().toString();
      period = 'AM';
    } else {
      hours = (date.getHours() - 12).toString();
      period = 'PM';
    }
  
    if (hours === '0') {
      hours = '12';
    }
  
    if (minutes.length <= 1) minutes = `0${minutes}`;
  
    return `${hours}:${minutes} ${period}`;
  };
export const getFahrenheit = (temp: number): number => {
    return Math.round((temp * 9) / 5 + 32);
  } 
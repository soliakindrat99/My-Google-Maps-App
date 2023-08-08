const getDistanceBetweenTwoPoins = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  //Haversine formula a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  //c = 2 ⋅ atan2( √a, √(1−a) )
  //d = R ⋅ c
  //φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
  //note that angles need to be in radians to pass to trig functions!

  const earthRadiusKm = 6371; // Radius of the Earth in kilometers

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = earthRadiusKm * c;
  const distanceMeters = distanceKm * 1000;
  return distanceMeters;
};

export default getDistanceBetweenTwoPoins;

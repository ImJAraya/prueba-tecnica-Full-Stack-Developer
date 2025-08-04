export async function geocode(address) {
  const key=process.env.REACT_APP_ORS_API_KEY;
  const res = await fetch(
    `https://api.openrouteservice.org/geocode/search?api_key=${key}&text=${encodeURIComponent(address)}&boundary.country=CRI&size=1`
  );
  if (!res.ok) throw new Error('Geocode error');
  const data = await res.json();
  const feat = data.features?.[0];
  if (!feat) throw new Error('No geocode result');
  const [lon, lat] = feat.geometry.coordinates;
  return [lat, lon];
}

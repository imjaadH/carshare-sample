type StateMarker = {
  lat: number;
  lng: number;
  key: string;
  type: string;
};

type MarkerPoint = {
  title: string;
  coords: {
    lat: number;
    lng: number;
  };
};

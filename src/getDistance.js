const rad = function (x) {
    return x * Math.PI / 180;
};

export const getDistance = function (position, originalPosition) {
    // p1 = position() p2 = O_position
    // console.log(position.lat(), originalPosition)
    const R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(originalPosition.lat - position.lat());
    let dLong = rad(originalPosition.lng - position.lng());
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(position.lat())) * Math.cos(rad(originalPosition.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d
    console.log('distance ', d); // returns the distance in meter
};
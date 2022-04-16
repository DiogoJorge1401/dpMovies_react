export const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '32b870a6884664e2cd1ea8ff4186204d',
  originalImage: (imgPath: string) =>
    `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

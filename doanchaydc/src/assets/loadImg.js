function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./ImgDoan4", false, /\.(png|jpeg?g|svg|jpg)$/)
);

export default images;
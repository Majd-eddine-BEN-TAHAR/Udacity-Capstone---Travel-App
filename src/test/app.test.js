import { sendRequest } from "./../client/js/_sendRequest";
const postUrl = `http://localhost:8085/POST`;
const data = {
  destination: "tunis",
  date: "1586199119",
};

const image =
  "https://pixabay.com/get/55e8dd464c54ab14f1dc8460c62d337a1636d7ed4e507441732e7ad69f4ac2_640.jpg";

test("fetching data", () => {
  sendRequest(postUrl, data).then((response) => {
    expect(response.data.image).toBe(image);
  });
});

export default async function fetchSpecificBorderComments(borderIndex) {
let relevantComments = [];

  fetch("http://localhost:5000/usersposts")
    .then((response) => response.json())
    .then((data) => {
      for (const item in data) {
        if (data[item].borderNum == borderIndex) {
          relevantComments.push(data[item]);
        }
      }
    });
  return relevantComments;
};

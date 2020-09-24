
export default function queryPersons(id) {
  const API_URL = "http://localhost:8080/person"
  if (id !== undefined) {
    API_URL += "/"+id
  }
  return fetch(API_URL).then(res => res.json())
}
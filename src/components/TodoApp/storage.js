export default ({key, db, data, defaultData}) => {
  const storage = window[`${db}Storage`]
  if (data) return storage.setItem(key, JSON.stringify(data))
  let item = storage.getItem(key)
  return item ? JSON.parse(item) : defaultData
}

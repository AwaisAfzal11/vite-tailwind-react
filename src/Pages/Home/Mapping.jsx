import {useState} from 'react'
function Project () {
  const [data, setData] = useState(
    [
      {title:'t1', desc:'adsfksdjlfasjf'}, 
      {title:'t2', desc:'ksdjhsdkfjs;ldf'}
    ]
  )
  return (
    <div>
      <h1>Project List</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <p>{item.desc}</p>
          </div>
      ))}
    </div>
  )
}

export default Project
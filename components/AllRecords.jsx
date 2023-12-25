import PersonCard from "./PersonCard"

const AllRecords = ({data , handleEdit , handleDelete}) => {
  return (
    <section className="w-full">
      <div className='mt-10 prompt_layout'>
        {data.map((post) =>(
          <PersonCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>      
    </section>
  )
}

export default AllRecords
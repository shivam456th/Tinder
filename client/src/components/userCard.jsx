const UserCard = ({user}) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          className="w-24 h-24 object-cover rounded-full"
          src={photoUrl || "https://via.placeholder.com/150"}
          alt={`${firstName} ${lastName}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <p>{about || "No bio available"}</p>
        <div className="card-actions justify-end text-sm text-gray-600">
          <p>{age ? `${age} years` : "Age N/A"}</p>
          <p>{gender || "Not specified"}</p>
          <p>{skills?.length > 0 ? skills.join(", ") : "No skills"}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard
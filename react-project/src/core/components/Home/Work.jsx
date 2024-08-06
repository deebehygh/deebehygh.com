const MyWorkCard = ({ title, description, imageUrl }) => {
    return (
      <div className="my-work-card">
        {imageUrl && <img src={imageUrl} alt={title} className="my-work-card-image" />}
        <h2 className="my-work-card-title">{title}</h2>
        <p className="my-work-card-description">{description}</p>
      </div>
    );
  };
  
  export default MyWorkCard;
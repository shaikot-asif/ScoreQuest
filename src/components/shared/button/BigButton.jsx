const BigButton = ({ func, classes, parentClass, type = "text", text }) => {
  return (
    <div className={`${parentClass}`}>
      <button
        className={`${classes} rounded-md hover:scale-95 transaction duration-300  w-full text-center text-xl py-5 text-secondary-goldenPoppy font-bold `}
        onClick={func}
        type={type}
      >
        {text}
      </button>
    </div>
  );
};

export default BigButton;

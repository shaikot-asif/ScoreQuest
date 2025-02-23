import { motion } from "framer-motion";

const PrimaryButton = ({ text, func = null }) => {
  return (
    <div>
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        whileHover={{ scale: 1.1 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        onClick={func}
        className="bg-secondary-goldenPoppy transition-all duration-150 text-primary-blackRussian rounded-[8px] px-[24px] py-[12px] font-bold hover:bg-inherit hover:text-natural-white border border-secondary-goldenPoppy "
      >
        {text}
      </motion.button>
    </div>
  );
};

export default PrimaryButton;

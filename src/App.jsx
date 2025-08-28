import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const cats = [
  {
    name: "Tiger",
    scientificName: "Panthera tigris",
    imageCode: "1501705388883-4ed8a543392c",
    description: "tiger in the water",
  },
  {
    name: "Lion",
    scientificName: "Panthera leo",
    imageCode: "1519066629447-267fffa62d4b",
    description: "lion and lioness resting on a rock in the sun",
  },
  {
    name: "Leopard",
    scientificName: "Panthera pardus",
    imageCode: "1566489564594-f2163930c034",
    description:
      "blue-eyed leopard resting high up with its head on its front paws",
  },
  {
    name: "Jaguar",
    scientificName: "Panthera onca",
    imageCode: "1601544359642-c76c4f7c3221",
    description: "jaguar closeup",
  },
  {
    name: "Snow leopard",
    scientificName: "Panthera uncia",
    imageCode: "1689847190291-f8e0823f13ab",
    description:
      "snow leopard lying low on some rocks, its fur blending in perfectly",
  },
  {
    name: "Cheetah",
    scientificName: "Acinonyx jubatus",
    imageCode: "1693702366986-cbfbd1cf0450",
    description: "cheetah in the grass at dusk",
  },
  {
    name: "Cougar",
    scientificName: "Puma concolor",
    imageCode: "1661004527094-07d861089aed",
    description: "cougar walking through the snow",
  },
];

function rand(max, min) {
  return +(min + (max - min) * Math.random()).toFixed(2);
}

export default function App() {
  const [imgActive, setImageActive] = useState(0);

  const nextBtn = () => {
    setImageActive((prev) => (prev + 1) % cats.length);
  };

  const prevBtn = () => {
    setImageActive((prev) => (prev - 1 + cats.length) % cats.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center p-8">
      <div className="relative">
        {/* Image Stack Container */}
        <div className="relative w-80 h-96 mb-8">
          <AnimatePresence >
            {cats.map((cat, ind) => {
              const isActive = imgActive === ind;
              const offset = ind - imgActive;
 
              return (
                <motion.div
                  key={`${cat.name}-${imgActive}`}
                  className="absolute inset-0"
                  initial={{
                    x: offset > 0 ? 300 : offset < 0 ? -300 : 0,
                    opacity: 0,
                    scale: 0.8,
                    rotate: rand(15, -15),
                  }}
                  animate={{
                    x: isActive ? 0 : offset * 20,
                    y: isActive ? 0 : Math.abs(offset) * 10,
                    opacity: isActive
                      ? 1
                      : Math.max(0.3, 1 - Math.abs(offset) * 0.3),
                    scale: isActive
                      ? 1
                      : Math.max(0.7, 1 - Math.abs(offset) * 0.1),
                    rotate: isActive ? 0 : rand(10, -10),
                    zIndex: isActive ? 100 : 50 - Math.abs(offset),
                  }}
                  exit={{
                    x: offset > 0 ? 300 : -300,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  transition={{
                    // type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.6,
                  }}
                  style={{
                    zIndex: isActive ? 100 : 50 - Math.abs(offset),
                  }}
                >
                  <motion.img
                    src={`https://images.unsplash.com/photo-${cat.imageCode}?w=400&h=500&fit=crop`}
                    alt={cat.description}
                    className={`w-full h-full object-cover rounded-xl shadow-2xl border-4 ${
                      isActive ? "border-white" : "border-gray-200"
                    }`}
                    whileHover={isActive ? { scale: 1.05 } : {}}
                  />

                  {/* Active state overlay with cat info */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl"
                    >
                      <h3 className="text-white text-xl font-bold">
                        {cat.name}
                      </h3>
                      <p className="text-gray-200 text-sm italic">
                        {cat.scientificName}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={prevBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-colors"
          >
            ← Previous
          </motion.button>

          <motion.button
            onClick={nextBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-colors"
          >
            Next →
          </motion.button>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-6">
          {cats.map((_, ind) => (
            <motion.button
              key={ind}
              onClick={() => setImageActive(ind)}
              className={`w-3 h-3 rounded-full transition-colors ${
                imgActive === ind ? "bg-orange-500" : "bg-orange-200"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

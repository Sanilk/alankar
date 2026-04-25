"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">

      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">About Our Boutique</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We create fashion that blends elegance, comfort, and individuality.
        </p>
      </motion.section>

      {/* STORY */}
      <section className="grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-105 rounded-xl overflow-hidden"
        >
          <Image
            src="/images/hero3.jpg"
            alt="About us"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            What started as a small passion project has grown into a curated
            fashion boutique dedicated to timeless style.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Every piece is carefully selected to ensure quality, comfort, and
            elegance for everyday wear and special occasions.
          </p>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center text-3xl font-bold mb-12"
        >
          Our Journey
        </motion.h2>

        <div className="space-y-8">

          {[
            {
              year: "2021",
              text: "Started as a small home boutique with a passion for design.",
            },
            {
              year: "2022",
              text: "Expanded collections and introduced online shopping.",
            },
            {
              year: "2024",
              text: "Became a trusted fashion destination for thousands of customers.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex gap-6 items-start"
            >
              <div className="text-black font-bold text-lg w-24">
                {item.year}
              </div>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* VALUES */}
      <section className="grid md:grid-cols-3 gap-8 text-center">

        {[
          {
            title: "Quality First",
            desc: "Premium fabrics and craftsmanship in every piece.",
          },
          {
            title: "Unique Design",
            desc: "Curated fashion for modern lifestyles.",
          },
          {
            title: "Customer Focus",
            desc: "Your comfort and satisfaction matter most.",
          },
        ].map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 bg-gray-50 rounded-xl"
          >
            <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
            <p className="text-gray-600 text-sm">{v.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* FOUNDER */}
      <section className="grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-100 rounded-xl overflow-hidden"
        >
          <Image
            src="/images/hero2.jpg"
            alt="Founder"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Meet the Founder</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Founded with a vision to bring elegant yet affordable fashion to
            everyone, our boutique is built on passion and creativity.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Every design reflects a personal commitment to style, quality, and
            customer happiness.
          </p>
        </motion.div>

      </section>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Ready to explore our collection?
        </h2>

        <a
          href="/shop"
          className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Shop Now
        </a>
      </motion.section>

    </main>
  );
}
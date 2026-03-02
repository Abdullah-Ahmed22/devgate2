export interface TestimonialType {
  id: number;
  image: string;
  description: string;
  name: string;
  position: string;
}

export async function getTestimonials(): Promise<TestimonialType[]> {
  const response = await fetch(
    "http://127.0.0.1:8000/api/teammates"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  return data.data;
}


export const testimonialsOneData = [
  {
    id: 1,
    image: "/img/testimonial/adam-othman.webp",
    stars: 6,
    title: "Testimonials",
    heading: "What Our Partners Say",
    content:
      "Dev Gate provided high-quality research and data collection services on both simple and complex tasks. They worked hard to implement everything we asked for with excellent quality and remained responsive to feedback, adapting quickly as project needs evolved.",
    author: "Dr. Adam Othman",
    position: "University of Illinois",
  },
  {
    id: 2,
    image: "/img/testimonial/abdel-rahman-nagy.webp",
    stars: 6,
    title: "Testimonials",
    heading: "What Our Partners Say",
    content:
      "Dev Gate is a vertically integrated company offering extensive capabilities across most research methodologies. Working with a single supplier for all research needs—from test design and data collection to processing, analysis, and recommendations—was highly efficient and valuable.",
    author: "Mr. Abdel Rahman Nagy",
    position: "JPAL Egypt",
  },
  {
    id: 3,
    image: "/img/testimonial/ahmed-ismail.webp",
    stars: 6,
    title: "Testimonials",
    heading: "What Our Partners Say",
    content:
      "The Dev Gate CPD program in early childhood education delivered to our group of nursery teachers was truly inspiring and energizing. It brought many practical ideas together with in-depth knowledge, case studies, and hands-on, practice-oriented learning.",
    author: "Mr. Ahmed Ismail",
    position: "Khair & Barka NGO",
  },
];

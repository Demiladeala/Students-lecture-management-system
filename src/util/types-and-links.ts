import { WeekData } from "../components/weekly-calendar";

export const demoWeekData: WeekData = {
    Monday: {
      color: "bg-[#FF823F] text-gray-100",
      subColor:"bg-[#FFDAC5]",
      spacing:"lg:mt-4",
      courses: [
        {
          name: "Math",
          numStudents: 30,
          time: "9:00 AM - 10:30 AM",
          subtitle: "Algebra and Calculus",
        },
        {
          name: "History",
          numStudents: 25,
          time: "11:00 AM - 12:30 PM",
          subtitle: "Ancient Civilizations",
        },
      ],
    },
    Tuesday: {
      color: "bg-[#F5BB23] text-gray-100",
      subColor:"bg-[#FDEABD]",
      spacing:"lg:mt-16",
      courses: [
        {
          name: "Science",
          numStudents: 28,
          time: "10:00 AM - 11:30 AM",
          subtitle: "Physics and Chemistry",
        },
        {
          name: "English",
          numStudents: 22,
          time: "1:00 PM - 2:30 PM",
          subtitle: "Literature and Composition",
        },
      ],
    },
    Wednesday: {
      color: "bg-[#FFA7A7] text-gray-100",
      subColor:"bg-[#FFE5E6]",
      spacing:"",
      courses: [
        {
          name: "Art",
          numStudents: 20,
          time: "9:00 AM - 10:30 AM",
          subtitle: "Painting and Drawing",
        },
        {
          name: "Physical Education",
          numStudents: 35,
          time: "11:00 AM - 12:30 PM",
          subtitle: "Fitness and Sports",
        },
      ],
    },
    Thursday: {
      color: "bg-[#0DBDF6] text-gray-100",
      subColor:"bg-[#B7EBFC]",
      spacing:"lg:mt-24",
      courses: [
        {
          name: "Math",
          numStudents: 30,
          time: "9:00 AM - 10:30 AM",
          subtitle: "Statistics and Probability",
        },
        {
          name: "Science",
          numStudents: 28,
          time: "1:00 PM - 2:30 PM",
          subtitle: "Biology and Earth Sciences",
        },
      ],
    },
    Friday: {
      color: "bg-[#465361] text-gray-100",
      subColor:"bg-[#C7CBD1]",
      spacing:"",
      courses: [
        {
          name: "English",
          numStudents: 22,
          time: "10:00 AM - 11:30 AM",
          subtitle: "Creative Writing",
        },
        {
          name: "Music",
          numStudents: 18,
          time: "1:00 PM - 2:30 PM",
          subtitle: "Music Theory and Practice",
        },
      ],
    },
    Saturday: {
      color: "bg-[#15BE39] text-gray-100",
      subColor:"bg-[#BAECC4]",
      spacing:"lg:mt-24",
      courses: [
        {
          name: "Programming",
          numStudents: 15,
          time: "10:00 AM - 12:00 PM",
          subtitle: "Introduction to Coding",
        },
      ],
    },
    Sunday: {
      color: "bg-gray-100",
      subColor:"bg-gray-50",
      spacing:"",
      courses: [], // No classes on Sunday
    },
  };
  

  // export const calendarDemoWeekData: CalendarWeekData = {
  //   Monday: [
  //     { title: "Mathematics 101", time: "8:00 AM - 9:30 AM", students: 25, subtitle: "Lecture Hall A" },
  //     { title: "Physics 201", time: "10:00 AM - 11:30 AM", students: 30, subtitle: "Lecture Hall B" },
  //   ],
  //   Tuesday: [
  //     { title: "Chemistry 101", time: "9:00 AM - 10:30 AM", students: 20, subtitle: "Lab C" },
  //     { title: "Biology 102", time: "11:00 AM - 12:30 PM", students: 22, subtitle: "Lecture Hall A" },
  //   ],
  //   Wednesday: [
  //     { title: "History 101", time: "8:00 AM - 9:00 AM", students: 28, subtitle: "Lecture Hall D" },
  //     { title: "English 201", time: "9:30 AM - 11:00 AM", students: 32, subtitle: "Lecture Hall B" },
  //   ],
  //   Thursday: [
  //     { title: "Computer Science 101", time: "10:00 AM - 11:30 AM", students: 35, subtitle: "Lab E" },
  //     { title: "Mathematics 102", time: "1:00 PM - 2:30 PM", students: 25, subtitle: "Lecture Hall A" },
  //   ],
  //   Friday: [
  //     { title: "Physics 202", time: "9:00 AM - 10:30 AM", students: 30, subtitle: "Lecture Hall B" },
  //     { title: "Chemistry 102", time: "11:00 AM - 12:30 PM", students: 20, subtitle: "Lab C" },
  //   ],
  //   Saturday: [
  //     { title: "Biology 201", time: "10:00 AM - 11:30 AM", students: 22, subtitle: "Lecture Hall A" },
  //   ],
  //   Sunday: [],
  // };
  
var dbCourses = [
  {
    id: 1,
    name: 'Sistema de Informação',
    nameTeacher: 'Gustavo',
    nbrStudent: 5,
    duration: '4 anos'
  },
  {
    id: 2,
    name: 'Engenharia de Software',
    nameTeacher: 'Paulo',
    nbrStudent: 10,
    duration: '5 anos'
  },
  {
    id: 3,
    name: 'Engenharia de Computação',
    nameTeacher: 'Luiz Mário',
    nbrStudent: 15,
    duration: '5 anos'
  },
  {
    id: 4,
    name: 'Análise de Sistema de Informação',
    nameTeacher: 'Dianne',
    nbrStudent: 20,
    duration: '2 anos'
  },
  {
    id: 5,
    name: 'Ciência da Computação',
    nameTeacher: 'Jair',
    nbrStudent: 25,
    duration: '5 anos'
  },
];

module.exports = {
  index: async (req, res) => {
    return res.json(dbCourses);
  },

  create: async (req, res) => {
    const { name, nameTeacher, nbrStudent, duration } = req.body;

    if (!name || !nameTeacher || !nbrStudent || !duration) {
      return res.status(400).json({ error: 'Fill in the fields correctly.' })
    }

    const lastId = dbCourses.reduce((id, course) => {
      return course.id > id ? course.id : id
    }, 0);

    const newCourse = {
      id: lastId + 1,
      name,
      nameTeacher,
      nbrStudent,
      duration
    }
    dbCourses.push(newCourse)

    return res.json(newCourse)
  },

  read: async (req, res) => {
    const { id } = req.params;
    const courseSearch = dbCourses.filter(course => `${course.id}` === `${id}`);

    return res.json(courseSearch[0] || {});
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { name, nameTeacher, nbrStudent, duration } = req.body;

    const indexUpdate = dbCourses.findIndex(course => `${course.id}` === `${id}`);
    console.log(indexUpdate);

    const courseUpdated = dbCourses[indexUpdate];

    if(name) courseUpdated.name = name;
    if(nameTeacher) courseUpdated.nameTeacher = nameTeacher;
    if(nbrStudent) courseUpdated.nbrStudent = nbrStudent;
    if(duration) courseUpdated.duration = duration;

    dbCourses[indexUpdate] = courseUpdated;

    return res.json(courseUpdated);

  },

  delete: async (req, res) => {
    const { id } = req.params;

    const newCourseDel = dbCourses.filter(course => `${course.id}` != `${id}`);
    dbCourses = newCourseDel;
    return res.json(newCourseDel);
  }
}
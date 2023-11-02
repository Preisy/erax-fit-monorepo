export default {
  auth: {
    signUp: {
      bodyParams: {
        fields: {
          age: 'Возраст',
          weight: 'Вес',
          teenAgeWeight: 'Вес в подростковом возрасте',
        },
      },
      credentials: {
        errors: {
          passwordMismatch: 'Пароли не совпадают',
        },
        fields: {
          username: 'Имя и фамилия',
          email: 'Почта',
          password: 'Пароль',
          passwordRepeat: 'Повторите пароль',
        },
      },
      diseases: {
        fields: {
          gastrointestinalDiseases: 'Заболевания ЖКТ',
          insulinResistance: 'Инсулинрезистентность',
          kidneyDisease: 'Заболевания почек',
          diseasesCVD: 'Заболевания ССС',
          diseasesODA: 'Заболевания ОДА',
        },
      },
      forbiddens: {
        fields: {
          diet: 'Запреты в питании',
          allergic: 'Аллергии',
          intolerance: 'Непереносимость продуктов',
        },
      },
      motivations: {
        fields: {
          loadRestrictions: 'Запреты в нагрузке',
          sportExperience: 'Спортивный опыт',
          targets: 'Цели',
        },
      },
    },
    login: {
      fields: {
        email: 'Почта',
        password: 'Пароль',
      },
      controls: {
        forget: 'Забыли пароль',
      },
    },
  },
};

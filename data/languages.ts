export const webDevelopmentLanguages = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "PHP",
    "Ruby",
    "Python",
    "Elixir",
    "Go",
    "Rust"
  ] as const;

  export const systemProgrammingLanguages = [
    "C",
    "C++",
    "Rust",
    "Assembly",
    "Go",
    "Zig"
  ] as const;

  export const mobileDevelopmentLanguages: string[] = [
    "Java",
    "Kotlin",
    "Swift",
    "Objective-C",
    "Dart",
    "React Native", // via React Native
    "C#"
  ] as const;

  export const dataScienceLanguages: string[] = [
    "Python",
    "R",
    "Julia",
    "MATLAB",
    "Scala",
    "Java"
  ] as const;

  export const functionalLanguages: string[] = [
    "Haskell",
    "F#",
    "Elixir",
    "Erlang",
    "OCaml",
    "Scala",
    "Lisp",
    "Clojure"
  ] as const;

  export const scriptingLanguages: string[] = [
    "Python",
    "Bash",
    "Shell",
    "Perl",
    "Ruby",
    "PowerShell",
    "JavaScript"
  ] as const;

  export const databaseLanguages: string[] = [
    "SQL",
    "PL/SQL",
    "T-SQL",
    "GraphQL",
    "Cypher"
  ] as const;

  export const enterpriseLanguages: string[] = [
    "Java",
    "C#",
    "Visual Basic",
    "COBOL",
    "Fortran",
    "ABAP"
  ] as const;

  export const scientificLanguages: string[] = [
    "Python",
    "R",
    "MATLAB",
    "Fortran",
    "Julia"
  ] as const;

  export const gameDevelopmentLanguages: string[] = [
    "C++",
    "C#",
    "JavaScript",
    "Lua",
    "GDScript"
  ] as const;

  export const languageCategories = [
    "Web Development",
    "System Programming",
    "Mobile Development",
    "AI / Data Science / Machine Learning",
    "Functional Programming",
    "Scripting / Automation",
    "Database / Query Languages",
    "Enterprise / Legacy Systems",
    "Scientific & Mathematical",
    "Game Development"
  ] as const;

  export const allLanguages: string[] = [
    ...webDevelopmentLanguages,
    ...systemProgrammingLanguages,
    ...mobileDevelopmentLanguages,
    ...dataScienceLanguages,
    ...functionalLanguages,
    ...scriptingLanguages,
    ...databaseLanguages,
    ...enterpriseLanguages,
    ...scientificLanguages,
    ...gameDevelopmentLanguages
  ];

  export const categorizedLanguages = [
    {
      category: "Web Development",
      languages: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "PHP",
        "Ruby",
        "Python",
        "Elixir",
        "Go",
        "Rust"
      ]
    },
    {
      category: "System Programming",
      languages: [
        "C",
        "C++",
        "Rust",
        "Assembly",
        "Go",
        "Zig"
      ]
    },
    {
      category: "Mobile Development",
      languages: [
        "Java",
        "Kotlin",
        "Swift",
        "Objective-C",
        "Dart",
        "JavaScript",
        "C#"
      ]
    },
    {
      category: "AI / Data Science / Machine Learning",
      languages: [
        "Python",
        "R",
        "Julia",
        "MATLAB",
        "Scala",
        "Java"
      ]
    },
    {
      category: "Functional Programming",
      languages: [
        "Haskell",
        "F#",
        "Elixir",
        "Erlang",
        "OCaml",
        "Scala",
        "Lisp",
        "Clojure"
      ]
    },
    {
      category: "Scripting / Automation",
      languages: [
        "Python",
        "Bash",
        "Shell",
        "Perl",
        "Ruby",
        "PowerShell",
        "JavaScript"
      ]
    },
    {
      category: "Database / Query Languages",
      languages: [
        "SQL",
        "PL/SQL",
        "T-SQL",
        "GraphQL",
        "Cypher"
      ]
    },
    {
      category: "Enterprise / Legacy Systems",
      languages: [
        "Java",
        "C#",
        "Visual Basic",
        "COBOL",
        "Fortran",
        "ABAP"
      ]
    },
    {
      category: "Scientific & Mathematical",
      languages: [
        "Python",
        "R",
        "MATLAB",
        "Fortran",
        "Julia"
      ]
    },
    {
      category: "Game Development",
      languages: [
        "C++",
        "C#",
        "JavaScript",
        "Lua",
        "GDScript"
      ]
    }
  ] as const;
  
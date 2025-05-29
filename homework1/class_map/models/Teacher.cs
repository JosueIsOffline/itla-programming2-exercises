class Teacher : Faculty
{
    int YearsExperience { get; set; }

    public Teacher(
        string fullName,
        string email,
        decimal salary,
        string department,
        string subject,
        int yearsExperience
        ) : base(fullName, email, salary, department, subject)
    {
        YearsExperience = yearsExperience;
    }

    public override string GetRole()
    {
        return "Teacher";
    }
}

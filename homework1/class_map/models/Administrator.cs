class Administrator : Faculty
{
    public string OfficeNumber { get; set; }

    public Administrator(
        string fullName,
        string email,
        decimal salary,
        string department,
        string subject,
        string officeNumber
        ) : base(fullName, email, salary, department, subject)
    {
        OfficeNumber = officeNumber;
    }


    public override string GetRole()
    {
        return "Administrator";
    }
}

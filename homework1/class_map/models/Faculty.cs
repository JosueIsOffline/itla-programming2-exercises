abstract class Faculty : Employee
{
    public string Subject { get; set; }

    public Faculty(
        string fullName,
        string email,
        decimal salary,
        string department,
        string subject) : base(fullName, email, salary, department)
    {

        Subject = subject;

    }

    public abstract override string GetRole();

}

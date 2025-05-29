abstract class Employee : CommunityMember
{
    public decimal Salary { get; set; }
    public string Department { get; set; }

    public Employee(string fullName, string email, decimal salary, string department) : base(fullName, email)
    {
        Salary = salary;
        Department = department;
    }

    public abstract override string GetRole();
}

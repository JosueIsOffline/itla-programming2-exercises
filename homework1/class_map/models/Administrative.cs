class Administrative : Employee
{
    public string Shift { get; set; }

    public Administrative(string fullName, string email, decimal salary, string deparment, string shift) : base(fullName, email, salary, deparment)
    {
        Shift = shift;
    }

    public override string GetRole()
    {
        return "Administrative Staff";
    }
}

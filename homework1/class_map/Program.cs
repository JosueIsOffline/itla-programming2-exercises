// List of CommunityMember holding different derived types
List<CommunityMember> members = new List<CommunityMember>
            {
                new Student("Ana Pérez", "ana@example.com", "Computer Science"),
                new FormerStudent("Luis Gómez", "luis@example.com", 2020),
                new Administrative("Marta Rivera", "marta@example.com", 3000m, "Admissions", "Morning"),
                new Teacher("Carlos Rojas", "carlos@example.com", 5000m, "Engineering", "Math", 10),
                new Administrator("Sofía Martínez", "sofia@example.com", 6000m, "Management", "IT", "B204")
            };

// Polymorphism in action
foreach (var member in members)
{
    Console.WriteLine($"{member.FullName} - Role: {member.GetRole()}");
}

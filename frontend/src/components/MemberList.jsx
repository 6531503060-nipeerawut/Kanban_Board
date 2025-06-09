export default function MemberList({ members }) {
  return (
    <ul className="space-y-2">
      {members.map(member => (
        <li key={member.id} className="border p-3 rounded-md flex justify-between">
          <div>
            <p className="font-medium">{member.name}</p>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
          <p className="text-sm text-blue-500">{member.role}</p>
        </li>
      ))}
    </ul>
  );
}
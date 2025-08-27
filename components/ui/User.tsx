// Usage
{/* <User name="Alice" />
<User name="Bob" badge="Admin" />
<User name="Charlie" avatarOnly /> */}

type UserProps = {
  name: string;
  badge?: string;
  avatarOnly?: boolean; // NEW: Only show avatar
};

export default function User({ name, badge = "Member", avatarOnly = false }: UserProps) {
  const avatar = (
    <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white font-semibold text-sm cursor-pointer">
      {name[0].toUpperCase()}
    </div>
  );

  if (avatarOnly) return avatar;

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      {avatar}

      <div className="leading-tight">
        <div className="text-sm font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{badge}</div>
      </div>
    </div>
  );
}




type UserProps = {
  name: string;
  badge?: string;
};

export default function User({ name, badge = "Member" }: UserProps) {
  return (
    <div className="flex items-center space-x-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold">
        {name[0].toUpperCase()}
      </div>

      {/* Username & Badge */}
      <div className="leading-tight">
        <div className="text-sm font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{badge}</div>
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
}

const statusColors = {
  pending: "bg-orange-500",
  completed: "bg-green-500",
  canceled: "bg-red-500",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`text-white px-3 py-1 rounded-lg ${
        statusColors[status as keyof typeof statusColors]
      }`}
    >
      {status}
    </span>
  );
}

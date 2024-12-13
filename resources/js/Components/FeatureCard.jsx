const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-[#f5f7fc] p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Icon className="text-indigo-600" size={24} />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
        <p className="text-l text-gray-500" style={{ lineHeight: '2' }}>
            {description}
        </p>
    </div>
);

export default FeatureCard;

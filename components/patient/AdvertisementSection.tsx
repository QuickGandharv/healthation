import Link from "next/link";
import Image from "next/image";

const AdvertisementSection = ({ data }: any) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl mb-4">Special Offers</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data && data.map((ad: any) => (
                    <Link
                        key={ad.id}
                        href={ad.link}
                        target="_blank"
                        className={`${ad.color} overflow-hidden`}
                    >
                        <div className="relative w-full h-60">
                            <Image
                                src={ad?.image}
                                alt="Advertisement"
                                width={500}
                                height={300}
                                className="w-full h-auto object-cover"
                                unoptimized
                                priority
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdvertisementSection;
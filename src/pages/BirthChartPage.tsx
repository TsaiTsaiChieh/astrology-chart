import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { cities } from "../utils/cities";
import BirthChart from "../components/BirthChart";
import { Star } from "lucide-react";

const birthChartSchema = z.object({
  name: z.string().min(1, "請輸入姓名"),
  birthDate: z.string().min(1, "請選擇出生日期"),
  birthTime: z.string().min(1, "請選擇出生時間"),
  birthPlace: z.string().min(1, "請選擇出生地點"),
});

type BirthChartForm = z.infer<typeof birthChartSchema>;

const BirthChartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<{
    birthDate: string;
    birthTime: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BirthChartForm>({
    resolver: zodResolver(birthChartSchema),
    defaultValues: {
      name: "test",
      birthDate: "2000-10-10",
      birthTime: "13:39",
      birthPlace: "台中市",
    },
  });

  const onSubmit = async (data: BirthChartForm) => {
    setIsLoading(true);
    try {
      const selectedCity = cities.find(city => city.name === data.birthPlace);
      if (!selectedCity) throw new Error("無效的出生地點");

      setChartData({
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='pt-20 pb-12 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600'>
              生成你的星盤
            </span>
          </h1>
          <p className='text-gray-300 text-lg'>
            請填寫以下資料，我們將為你生成專屬的星盤解析
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='tarot-card rounded-xl p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-white mb-2'>姓名</label>
                <input
                  type='text'
                  {...register("name")}
                  className='w-full px-4 py-2 rounded-md bg-purple-900/50 border border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
                  placeholder='請輸入姓名'
                />
                {errors.name && (
                  <p className='text-red-400 text-sm mt-1'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-white mb-2'>出生日期</label>
                <input
                  type='date'
                  {...register("birthDate")}
                  max={format(new Date(), "yyyy-MM-dd")}
                  className='w-full px-4 py-2 rounded-md bg-purple-900/50 border border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
                />
                {errors.birthDate && (
                  <p className='text-red-400 text-sm mt-1'>
                    {errors.birthDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-white mb-2'>出生時間</label>
                <input
                  type='time'
                  {...register("birthTime")}
                  className='w-full px-4 py-2 rounded-md bg-purple-900/50 border border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
                />
                {errors.birthTime && (
                  <p className='text-red-400 text-sm mt-1'>
                    {errors.birthTime.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-white mb-2'>出生地點</label>
                <select
                  {...register("birthPlace")}
                  className='w-full px-4 py-2 rounded-md bg-purple-900/50 border border-yellow-400/30 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400'
                >
                  <option value=''>請選擇出生地點</option>
                  {cities.map(city => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.birthPlace && (
                  <p className='text-red-400 text-sm mt-1'>
                    {errors.birthPlace.message}
                  </p>
                )}
              </div>
            </div>

            <div className='mt-8 flex justify-center'>
              <button
                type='submit'
                disabled={isLoading}
                className='golden-border mystical-glow bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold transform transition hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? "生成中..." : "生成星盤"}
              </button>
            </div>
          </div>
        </form>

        <div className='mt-12'>
          <div className='tarot-card rounded-xl p-8'>
            <div className='text-center mb-8'>
              <Star className='h-12 w-12 text-yellow-400 mx-auto mb-4' />
              <h2 className='text-2xl font-bold text-white mb-2'>
                你的星盤解析
              </h2>
            </div>

            {chartData && <BirthChart {...chartData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthChartPage;

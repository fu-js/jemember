import LessonPage from "app/(nav)/(others)/lesson/[id]/LessonPage";
import { notFound } from "next/navigation";
import { supabaseGetCardsByLessonId, fetchLessonById } from "utils";

export const revalidate = "force-dynamic";

export default async function Lesson({ params }: { params: { id: string } }) {
  const _lessonPromise = fetchLessonById(params.id);
  const _cardsPromise = supabaseGetCardsByLessonId(params.id);

  const [lesson, cards] = await Promise.all([_lessonPromise, _cardsPromise]);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="px-4 pt-10 pb-32">
      <LessonPage lesson={lesson} cards={cards} />
    </div>
  );
}

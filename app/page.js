
import Feed from "@components/Feed";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            People Management
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center">Using Nodejs and Neo4j</span>
        </h1>
        <p className="desc text-center">
            Project made by Anass Salhi, Elmarnissi Soufiane and Omar Benyehya
        </p>
        <div className="sm:flex hidden pt-20 gap-5">
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-person" className="black_btn">
                        Create Person
                    </Link>
                </div>
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-task" className="black_btn">
                        Create Task
                    </Link>
                </div>
          </div>
          <Feed />
    </section>
  )
}

import { CalendarDays, Code2, MapPin } from 'lucide-react';

import { Card, CardContent } from '@/components/card';
import profilePicture from '../../resources/profile-picture.png';

function getYearsOfExperience(startDate = new Date(2019, 4, 1)): number {
    const now = new Date();
    const anniversaryThisYear = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
    const years = now.getFullYear() - startDate.getFullYear();

    return now < anniversaryThisYear ? years - 1 : years;
}

export function HomePage() {
    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="max-w-[46rem]">
                <Card className="rounded-2xl">
                    <CardContent className="space-y-6 p-6 sm:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="space-y-6">
                                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                    <span className="block">Hi, I&apos;m Derek</span>
                                    <span className="block">Roemhildt</span>
                                </h1>

                                <div className="space-y-3 text-muted-foreground">
                                    <p className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 shrink-0" />
                                        <span>Based in Minneapolis, Minnesota</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Code2 className="h-5 w-5 shrink-0" />
                                        <span>Full Stack Developer</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <CalendarDays className="h-5 w-5 shrink-0" />
                                        <span>{getYearsOfExperience()}+ Years of Experience</span>
                                    </p>
                                </div>
                            </div>

                            <img
                                alt="Portrait of Derek Roemhildt"
                                className="h-48 w-48 self-start rounded-xl border-2 border-border bg-secondary/30 object-contain sm:h-56 sm:w-56"
                                src={profilePicture}
                            />
                        </div>

                        <p className="text-sm leading-relaxed text-muted-foreground">
                            I&apos;m a full-stack software engineer building reliable, practical systems that simplify
                            complex workflows. I specialize in SaaS platforms, automation, and data pipelines. I lean
                            towards backend development and infrastructure, and I ship complete solutions across both
                            frontend and backend.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </section>
    );
}

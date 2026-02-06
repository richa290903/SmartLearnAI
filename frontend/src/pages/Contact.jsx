function Contact(){
    return (
        <div>
            <section class="bg-blue-50 dark:bg-white" id="contact">
                <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <div class="mb-4">
                    <div class="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <h2
                            class="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-black text-3xl sm:text-5xl">
                            Get in Touch
                        </h2>
                        <p class="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-900"> Want to contact us? Choose an
                                option below and well be happy to show you how we can transform company web experience.
                        </p>
                    </div>
                </div>
                <div class="flex items-stretch justify-center">
                    <div class="grid md:grid-cols-2">
                        <div class="h-full pr-6">
                            <ul class="mb-3 mt-14">
                                <li class="flex">
                                    <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="h-6 w-6">
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                            <path
                                                d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div class="ml-4 mb-4">
                                        <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-black">Our Address
                                        </h3>
                                        <p class="text-gray-600 dark:text-slate-900">1230 Maecenas Street Donec Road</p>
                                        <p class="text-gray-600 dark:text-slate-900">New York, EEUU</p>
                                    </div>
                                </li>
                                <li class="flex">
                                    <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="h-6 w-6">
                                            <path
                                                d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                            </path>
                                            <path d="M15 7a2 2 0 0 1 2 2"></path>
                                            <path d="M15 3a6 6 0 0 1 6 6"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-4 mb-4">
                                        <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-black">Contact
                                        </h3>
                                        <p class="text-gray-600 dark:text-slate-900">Mobile: +91 1234567890</p>
                                        <p class="text-gray-600 dark:text-slate-900">Mail: interactdesignhub<span>&#64;</span>gmail.com</p>
                                    </div>
                                </li>
                                <li class="flex">
                                    <div class="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="h-6 w-6">
                                            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                            <path d="M12 7v5l3 3"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-4 mb-4">
                                        <h3 class="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-black">Working
                                            hours</h3>
                                        <p class="text-gray-600 dark:text-slate-900">Monday - Friday: 08:00 - 17:00</p>
                                        <p class="text-gray-600 dark:text-slate-900">Saturday &amp; Sunday: 08:00 - 12:00</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="card h-fit max-w-6xl p-5 md:p-12" id="form">
                            <form>
                                <div class="mb-6">
                                    <div class="mx-0 mb-1 sm:mb-4">
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <label class="pb-1 text-xs uppercase tracking-wider" ></label>
                                            <input type="text" autocomplete="off" placeholder="Your name" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-800 sm:mb-0" name="c_name" required/>
                                        </div>
                                        <div class="mx-0 mb-1 sm:mb-4">
                                            <label class="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="email"  autocomplete="off"  placeholder="Your email address" class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-800 sm:mb-0" name="c_email" required/>
                                        </div>
                                    </div>
                                    <div class="mx-0 mb-1 sm:mb-4">
                                        <label class="pb-1 text-xs uppercase tracking-wider"></label>
                                        <textarea  name="c_message" cols="30" rows="5" autocomplete="off" placeholder="Write your message..." class="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-800 sm:mb-0" required></textarea>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0" name="send_msg">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
   )}
   export default Contact;

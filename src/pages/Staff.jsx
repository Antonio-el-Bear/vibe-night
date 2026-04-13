

import { useState, useEffect } from "react";
import { MessageCircle, Users } from 'lucide-react';
import moment from "moment";
import { Button } from '@/components/ui/button';

const STAFF_ROLES = ["All", "Table Girl", "Manager", "Bartender", "Security", "DJ"];

const fakeStaff = [
  { id: 1, name: "Jane Doe", role: "Table Girl", venue: "Velvet Lounge", avatar: "https://randomuser.me/api/portraits/women/44.jpg", bio: "Friendly and attentive, Jane makes every guest feel special.", onDuty: true, shiftEnd: moment().add(2, 'hours').toISOString(), clockIn: moment().subtract(1, 'hours').toISOString(), clockOut: null },
  { id: 2, name: "John Smith", role: "Manager", venue: "Jazz Bar", avatar: "https://randomuser.me/api/portraits/men/32.jpg", bio: "John keeps the club running smoothly every night.", onDuty: true, shiftEnd: moment().add(30, 'minutes').toISOString(), clockIn: moment().subtract(3, 'hours').toISOString(), clockOut: null },
  { id: 3, name: "Emily Carter", role: "Bartender", venue: "Velvet Lounge", avatar: "https://randomuser.me/api/portraits/women/65.jpg", bio: "Emily crafts the best cocktails in town.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 4, name: "Mike Brown", role: "Security", venue: "Club Nova", avatar: "https://randomuser.me/api/portraits/men/41.jpg", bio: "Mike ensures everyone has a safe night out.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 5, name: "DJ Flex", role: "DJ", venue: "Jazz Bar", avatar: "https://randomuser.me/api/portraits/men/77.jpg", bio: "Spinning the hottest tracks all night long.", onDuty: true, shiftEnd: moment().add(1, 'hours').toISOString(), clockIn: moment().subtract(2, 'hours').toISOString(), clockOut: null },
  { id: 6, name: "Sarah Lee", role: "Table Girl", venue: "Club Nova", avatar: "https://randomuser.me/api/portraits/women/12.jpg", bio: "Sarah brings energy and smiles to every table.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 7, name: "Carlos Vega", role: "Bartender", venue: "Jazz Bar", avatar: "https://randomuser.me/api/portraits/men/23.jpg", bio: "Carlos is known for his signature mojitos.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
  { id: 8, name: "Nina Patel", role: "Manager", venue: "Velvet Lounge", avatar: "https://randomuser.me/api/portraits/women/33.jpg", bio: "Nina is the heart of the Velvet Lounge team.", onDuty: false, shiftEnd: null, clockIn: null, clockOut: null },
];

  const [search, setSearch] = useState("");
  const [activeRole, setActiveRole] = useState("All");
  const [modal, setModal] = useState(null); // For demo profile modal
  const [staff, setStaff] = useState(fakeStaff);
  const [chatWith, setChatWith] = useState(null); // staff member or 'group'
  const [messages, setMessages] = useState({}); // { staffId/group: [{from, text, time}] }
  const [chatInput, setChatInput] = useState("");
  const [notifications, setNotifications] = useState({}); // { staffId/group: count }
  
  // Simulate receiving new messages for demo (randomly add messages to chats)
  useEffect(() => {
    const interval = setInterval(() => {
      // Only simulate if no chat modal is open
      if (!chatWith && staff.length > 0) {
        const random = Math.random();
        if (random < 0.2) { // 20% chance
          // Pick a random staff member or group
          const targets = ['group', ...staff.map(s => s.id)];
          const target = targets[Math.floor(Math.random() * targets.length)];
          const fakeMsg = {
            from: 'them',
            text: target === 'group' ? 'Announcement: Please check in!' : 'Hi, do you need anything?',
            time: Date.now(),
          };
          setMessages(m => ({ ...m, [target]: [...(m[target] || []), fakeMsg] }));
          setNotifications(n => ({ ...n, [target]: (n[target] || 0) + 1 }));
        }
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [chatWith, staff]);

  function handleClockIn(id) {
    setStaff(staff => staff.map(s =>
      s.id === id ? {
        ...s,
                            <form onSubmit={e => {
                              e.preventDefault();
                              if (!chatInput.trim()) return;
                              const key = chatWith === 'group' ? 'group' : chatWith.id;
                              setMessages(m => ({ ...m, [key]: [...(m[key] || []), { from: 'me', text: chatInput, time: Date.now() }] }));
                              setChatInput("");
                              // AI: Context-aware reply after short delay
                              setTimeout(() => {
                                let reply = '';
                                const lower = chatInput.toLowerCase();
                                if (lower.includes('hello') || lower.includes('hi')) {
                                  reply = key === 'group' ? 'Hello team! 👋' : `Hi! How can I help you?`;
                                } else if (lower.includes('shift')) {
                                  reply = key === 'group' ? 'Reminder: Check your shift times in the app.' : `My shift ends ${moment(staff.find(s => s.id === key)?.shiftEnd).fromNow()}.`;
                                } else if (lower.includes('clock in') || lower.includes('clock out')) {
                                  reply = 'Got it! Logging your request.';
                                } else if (lower.includes('thanks') || lower.includes('thank you')) {
                                  reply = 'You’re welcome!';
                                } else if (lower.includes('announce')) {
                                  reply = 'Announcement sent to all staff.';
                                } else if (lower.includes('drink') || lower.includes('order')) {
                                  reply = 'I’ll let the bar know!';
                                } else if (lower.includes('security')) {
                                  reply = 'Security is on standby.';
                                } else if (lower.includes('music') || lower.includes('dj')) {
                                  reply = 'The DJ is ready to take requests!';
                                } else {
                                  reply = key === 'group' ? 'Team, please check the latest updates.' : 'Okay!';
                                }
                                setMessages(m => ({ ...m, [key]: [...(m[key] || []), { from: 'them', text: reply, time: Date.now() }] }));
                                setNotifications(n => ({ ...n, [key]: (n[key] || 0) + 1 }));
                              }, 1200);
                            }} className="flex gap-2 mt-2">
          ))}
        </div>
      </div>

      {/* Staff list or empty state */}
      {staff.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-lg text-white/60 mb-2">No staff found. Add your first staff member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staff
            .filter(member =>
              (activeRole === "All" || member.role === activeRole) &&
              (search === "" || member.name.toLowerCase().includes(search.toLowerCase()) || member.venue.toLowerCase().includes(search.toLowerCase()))
            )
            .map(member => (
              <div key={member.id} className="bg-[#23232a] rounded-xl p-5 text-white flex flex-col gap-2 shadow hover:shadow-pink-500/20 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border-2 border-pink-500" />
                  <div>
                    <div className="font-bold text-lg">{member.name}</div>
                    <div className="text-sm text-white/80">{member.role} @ {member.venue}</div>
                    {member.onDuty && member.shiftEnd && (
                      <div className="text-xs text-accent mt-1">Shift ends {moment(member.shiftEnd).fromNow()}</div>
                    )}
                    {!member.onDuty && member.clockOut && (
                      <div className="text-xs text-muted-foreground mt-1">Last clocked out {moment(member.clockOut).fromNow()}</div>
                    )}
                  </div>
                  <div className="ml-auto flex flex-col gap-2">
                    <Button size="sm" variant={member.onDuty ? "outline" : "default"} onClick={() => member.onDuty ? handleClockOut(member.id) : handleClockIn(member.id)}>
                      {member.onDuty ? "Clock Out" : "Clock In"}
                    </Button>
                    <button onClick={() => setModal(member)} className="self-end bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold rounded-lg px-3 py-1 transition">View Profile</button>
                    <button onClick={() => {
                      setChatWith(member);
                      setChatInput("");
                      setNotifications(n => ({ ...n, [member.id]: 0 }));
                    }} className="self-end flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg px-3 py-1 transition mt-1">
                      <MessageCircle className="w-4 h-4" /> Chat
                      {notifications[member.id] > 0 && (
                        <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-[10px] font-bold">{notifications[member.id]}</span>
                      )}
                    </button>
                  </div>
                      <div className="flex justify-end mt-8">
                        <button onClick={() => {
                          setChatWith('group');
                          setChatInput("");
                          setNotifications(n => ({ ...n, group: 0 }));
                        }} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-5 py-2 text-base transition">
                          <Users className="w-5 h-5" /> Group Chat / Announcements
                          {notifications.group > 0 && (
                            <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-[10px] font-bold">{notifications.group}</span>
                          )}
                        </button>
                      </div>
                      {/* Chat Modal */}
                      {chatWith && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                          <div className="bg-[#18181b] rounded-2xl p-6 w-full max-w-md text-white relative flex flex-col max-h-[90vh]">
                            <button onClick={() => setChatWith(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">&times;</button>
                            <div className="flex items-center gap-3 mb-4">
                              {chatWith === 'group' ? (
                                <>
                                  <Users className="w-8 h-8 text-green-400" />
                                  <div>
                                    <div className="font-bold text-lg">Group Chat</div>
                                    <div className="text-xs text-white/60">Announcements to all staff</div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <img src={chatWith.avatar} alt={chatWith.name} className="w-8 h-8 rounded-full object-cover border-2 border-blue-400" />
                                  <div>
                                    <div className="font-bold text-lg">{chatWith.name}</div>
                                    <div className="text-xs text-white/60">{chatWith.role} @ {chatWith.venue}</div>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="flex-1 overflow-y-auto mb-3 space-y-2 pr-1" style={{ minHeight: 200, maxHeight: 300 }}>
                              {(messages[chatWith === 'group' ? 'group' : chatWith.id] || []).map((msg, i) => (
                                <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'} items-end`}>
                                  <div className={`rounded-xl px-3 py-2 text-sm ${msg.from === 'me' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white'}`}>
                                    {msg.text}
                                    <div className="text-[10px] text-white/60 mt-1 text-right">{msg.time ? new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
                                  </div>
                                </div>
                              ))}
                              {(messages[chatWith === 'group' ? 'group' : chatWith.id] || []).length === 0 && (
                                <div className="text-center text-white/40 text-xs">No messages yet.</div>
                              )}
                            </div>
                            <form onSubmit={e => {
                              e.preventDefault();
                              if (!chatInput.trim()) return;
                              const key = chatWith === 'group' ? 'group' : chatWith.id;
                              setMessages(m => ({ ...m, [key]: [...(m[key] || []), { from: 'me', text: chatInput, time: Date.now() }] }));
                              setChatInput("");
                              // AI: Context-aware reply after short delay
                              setTimeout(() => {
                                let reply = '';
                                const lower = chatInput.toLowerCase();
                                if (lower.includes('hello') || lower.includes('hi')) {
                                  reply = key === 'group' ? 'Hello team! 👋' : `Hi! How can I help you?`;
                                } else if (lower.includes('shift')) {
                                  reply = key === 'group' ? 'Reminder: Check your shift times in the app.' : `My shift ends ${moment(staff.find(s => s.id === key)?.shiftEnd).fromNow()}.`;
                                } else if (lower.includes('clock in') || lower.includes('clock out')) {
                                  reply = 'Got it! Logging your request.';
                                } else if (lower.includes('thanks') || lower.includes('thank you')) {
                                  reply = 'You’re welcome!';
                                } else if (lower.includes('announce')) {
                                  reply = 'Announcement sent to all staff.';
                                } else if (lower.includes('drink') || lower.includes('order')) {
                                  reply = 'I’ll let the bar know!';
                                } else if (lower.includes('security')) {
                                  reply = 'Security is on standby.';
                                } else if (lower.includes('music') || lower.includes('dj')) {
                                  reply = 'The DJ is ready to take requests!';
                                } else {
                                  reply = key === 'group' ? 'Team, please check the latest updates.' : 'Okay!';
                                }
                                setMessages(m => ({ ...m, [key]: [...(m[key] || []), { from: 'them', text: reply, time: Date.now() }] }));
                                setNotifications(n => ({ ...n, [key]: (n[key] || 0) + 1 }));
                              }, 1200);
                            }} className="flex gap-2 mt-2">
                              <input
                                type="text"
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                placeholder={chatWith === 'group' ? "Send announcement..." : `Message ${chatWith.name}...`}
                                className="flex-1 rounded-xl px-3 py-2 bg-[#23232a] text-white focus:outline-none"
                              />
                              <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-xl px-4 py-2 font-semibold text-white">Send</button>
                            </form>
                          </div>
                        </div>
                      )}
                </div>
              </div>
            ))}
        </div>
      )}
      <h2 className="text-xl font-semibold mt-10 mb-4">Upcoming Shift Changes</h2>
      <div className="space-y-2">
        {staff.filter(s => s.onDuty && s.shiftEnd && moment(s.shiftEnd).diff(moment(), 'minutes') < 60).length === 0 && (
          <div className="text-muted-foreground text-sm">No upcoming shift changes in the next hour.</div>
        )}
        {staff.filter(s => s.onDuty && s.shiftEnd && moment(s.shiftEnd).diff(moment(), 'minutes') < 60).map(member => (
          <div key={member.id} className="flex items-center gap-2 text-sm">
            <span className="font-medium">{member.name}</span>
            <span className="text-muted-foreground">({member.role})</span>
            <span className="text-accent">shifts in {moment(member.shiftEnd).fromNow(true)}</span>
          </div>
        ))}
      </div>

      {/* Demo profile modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md text-white relative">
            <button onClick={() => setModal(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">&times;</button>
            <div className="flex flex-col items-center gap-3">
              <img src={modal.avatar} alt={modal.name} className="w-20 h-20 rounded-full object-cover border-2 border-pink-500" />
              <div className="font-bold text-2xl">{modal.name}</div>
              <div className="text-pink-400 font-semibold">{modal.role}</div>
              <div className="text-white/70 mb-2">{modal.venue}</div>
              <div className="text-center text-white/80">{modal.bio}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
